const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const AGREEMENT_VERSION = '2026-09-12'
const GENERIC_ERROR_MESSAGE = '저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.'

function getPhoneDigits(phone) {
  return String(phone ?? '').replace(/\D/g, '')
}

function formatPhone(digits) {
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

function getPhoneError(phone) {
  const digits = getPhoneDigits(phone)
  if (!digits) return '전화번호를 입력해주세요.'
  if (digits.length < 11) return '전화번호 11자리를 모두 입력해주세요.'
  if (!digits.startsWith('010')) return '010으로 시작하는 번호를 입력해주세요.'
  return ''
}

function getJwtRole(token) {
  const [, payload] = String(token ?? '').split('.')

  if (!payload) return ''

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '=')
    const decodedPayload = JSON.parse(atob(paddedPayload))
    return decodedPayload.role ?? ''
  } catch {
    return ''
  }
}

export async function POST(request) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase environment variables')
    return Response.json({ message: GENERIC_ERROR_MESSAGE, type: 'server_error' }, { status: 500 })
  }

  if (
    SUPABASE_SERVICE_ROLE_KEY.startsWith('sb_publishable_') ||
    getJwtRole(SUPABASE_SERVICE_ROLE_KEY) === 'anon'
  ) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not a service role key')
    return Response.json(
      { message: GENERIC_ERROR_MESSAGE, type: 'server_error' },
      { status: 500 }
    )
  }

  let body

  try {
    body = await request.json()
  } catch {
    return Response.json({ message: '요청 형식이 올바르지 않아요.', type: 'validation_error' }, { status: 400 })
  }

  const phoneDigits = getPhoneDigits(body.phone)
  const phoneError = getPhoneError(phoneDigits)

  if (phoneError) {
    return Response.json({ message: phoneError, type: 'validation_error' }, { status: 400 })
  }

  if (body.privacyAgreed !== true) {
    return Response.json(
      { message: '개인정보 이용 동의가 필요해요.', type: 'validation_error' },
      { status: 400 }
    )
  }

  let response

  try {
    response = await fetch(`${SUPABASE_URL}/rest/v1/launch_notifications`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        phone: formatPhone(phoneDigits),
        phone_digits: phoneDigits,
        privacy_agreed: true,
        agreement_version: body.agreementVersion ?? AGREEMENT_VERSION,
        source: 'landing',
      }),
    })
  } catch (error) {
    console.error('Supabase launch notification request failed:', error)

    return Response.json(
      { message: GENERIC_ERROR_MESSAGE, type: 'server_error' },
      { status: 500 }
    )
  }

  if (response.status === 409) {
    return Response.json({ message: '이미 신청된 번호예요.', type: 'duplicate' }, { status: 409 })
  }

  if (!response.ok) {
    const errorText = await response.text()

    console.error('Supabase launch notification insert failed:', {
      status: response.status,
      body: errorText,
    })

    return Response.json(
      { message: GENERIC_ERROR_MESSAGE, type: 'server_error' },
      { status: 500 }
    )
  }

  return Response.json({ message: '출시 알림 신청이 완료됐어요.', type: 'success' })
}
