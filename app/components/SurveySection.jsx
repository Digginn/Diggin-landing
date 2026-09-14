export default function SurveySection() {
  return (
    <section className='relative flex flex-col items-center gap-9 overflow-hidden pt-[68px] pb-16 min-[744px]:gap-[54px] min-[744px]:pt-[102px] min-[744px]:pb-24 min-[1280px]:gap-[72px] min-[1280px]:pt-[136px] min-[1280px]:pb-32'>
      <div className='relative z-10 flex w-full flex-col items-center gap-9 min-[744px]:gap-[54px] min-[1280px]:gap-[72px]'>
        <div className='flex w-full flex-col items-center gap-5 min-[744px]:gap-[30px] min-[1280px]:gap-10'>
          <div className='flex h-[27px] items-center justify-center rounded-[19px] bg-gray-700 px-[14px] min-[744px]:h-[40.5px] min-[744px]:rounded-[28.5px] min-[744px]:px-[21px] min-[1280px]:h-[54px] min-[1280px]:rounded-[38px] min-[1280px]:px-7'>
            <p className='survey-kicker whitespace-nowrap text-gray-400'>
              쇼핑 아카이빙 &#39;디긴&#39;
            </p>
          </div>
          <div className='w-full max-w-[375px] text-center min-[744px]:max-w-[586px]'>
            <p className='survey-title whitespace-nowrap text-white'>쇼핑 아카이빙에 대한</p>
            <p className='survey-title whitespace-nowrap text-white'>여러분의 의견을 들려주세요.</p>
          </div>
        </div>
        <button
          type='button'
          className='flex h-10 w-[272px] items-center justify-center rounded-[4px] bg-gray-200 min-[744px]:h-[60px] min-[744px]:w-[408px] min-[1280px]:h-20 min-[1280px]:w-[544px]'
        >
          <span className='survey-button-text text-gray-800'>설문 바로가기</span>
        </button>
      </div>
    </section>
  )
}
