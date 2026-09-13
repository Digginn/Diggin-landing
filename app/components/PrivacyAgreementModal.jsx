'use client'

import Modal from '@/app/components/Modal'

const PRIVACY_ITEMS = [
  {
    title: '1. 수집 및 이용 목적',
    description: 'Diggin 앱 공식 출시 알림 발송',
  },
  {
    title: '2. 수집하는 개인정보 항목',
    description: '[필수] 휴대전화번호',
  },
  {
    title: '3. 개인정보 이용 방법',
    description:
      '수집된 휴대전화번호는 Diggin 공식 카카오톡 채널을 통한 앱 출시 알림 발송을 위해서만 이용됩니다.\n\n수집된 개인정보는 광고, 이벤트, 프로모션 등 다른 마케팅 목적으로 이용하지 않습니다.',
  },
  {
    title: '4. 보유 및 이용 기간',
    description:
      '수집된 개인정보는 앱 출시 알림 발송 완료 시까지 보유·이용하며, 알림 발송 완료 후 지체 없이 파기합니다.\n\n단, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보관할 수 있습니다.',
  },
  {
    title: '5. 동의 거부 권리 및 불이익',
    description:
      '귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.\n\n다만, 휴대전화번호는 앱 출시 알림 제공을 위해 필요한 정보이므로 동의하지 않을 경우 출시 알림을 신청할 수 없습니다.\n\n개인정보 수집·이용 동의 여부는 향후 Diggin 서비스 이용에는 영향을 미치지 않습니다.',
  },
  {
    title: '6. 개인정보 관련 문의 및 동의 철회',
    description:
      '개인정보 삭제 또는 수집·이용 동의 철회를 원하는 경우 아래 연락처를 통해 요청할 수 있습니다.',
  },
]

export default function PrivacyAgreementModal({ open, onClose, onAgree }) {
  return (
    <Modal
      open={open}
      title='개인정보 수집 및 이용 동의'
      titleId='privacy-modal-title'
      actionLabel='동의하기'
      onAction={onAgree}
      onClose={onClose}
    >
      <div className='modal-body'>
        <p className='modal-description'>
          Diggin(디긴)은 앱 출시 알림 신청을 위해<br />
          아래와 같이 개인정보를 수집·이용합니다.
        </p>

        <div className='modal-terms' role='region' aria-label='개인정보 수집 및 이용 약관' tabIndex={0}>
          {PRIVACY_ITEMS.map((item) => (
            <div key={item.title} className='modal-term'>
              <p className='modal-term-title'>{item.title}</p>
              <p className='modal-term-description'>{item.description}</p>
            </div>
          ))}
          <p className='modal-term-description'>
            운영주체: 이교은<br />
            문의: <a href='mailto:diggin.app@gmail.com'>diggin.app@gmail.com</a>
          </p>
        </div>
      </div>
    </Modal>
  )
}
