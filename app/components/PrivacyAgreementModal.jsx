'use client'

import Modal from '@/app/components/Modal'

const PRIVACY_ITEMS = [
  {
    title: '1. 수집 및 이용 목적',
    description: '디깅 앱 출시 소식 전달 및 사전 신청 혜택 안내 및 서비스 알림 발송 관련 문의 응대',
  },
  {
    title: '2. 수집하는 개인정보 항목',
    description: '[필수] 휴대폰 번호',
  },
  {
    title: '3. 보유 및 이용 기간',
    description: '수집된 개인정보는 앱 공식 출시 후 30일 이내에 파기됩니다.',
  },
  {
    title: '4. 동의 거부 권리',
    description:
      '귀하는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 단, 동의하지 않으실 경우 출시 알림 수신이 제한됩니다.',
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
          [디깅]은 서비스 출시 알림 신청을 위해 아래와 같이 개인정보를 수집·이용합니다.
        </p>

        <div className='modal-terms'>
          {PRIVACY_ITEMS.map((item) => (
            <div key={item.title} className='modal-term'>
              <p className='modal-term-title'>{item.title}</p>
              <p className='modal-term-description'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
