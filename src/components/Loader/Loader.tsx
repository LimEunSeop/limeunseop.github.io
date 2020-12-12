import { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { AppContext, AppContextType } from 'App'
import { ReactComponent as MagsafeSvg } from './magsafe.svg'
import { rem } from 'utils/styledComponentUtils'

const colorChangeTime = 0.5

const fade_in = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fade_out = keyframes`
  to {
    opacity: 0;
  }
`

const NextColorBackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ color }) => (color ? color : '#000')};
  overflow: hidden;
  animation: ${fade_in} 1s cubic-bezier(0.16, 1, 0.3, 1); /* 로더 뜰때 서서히 뜨도록. 얘가 Wrapper 니까 여기다가 해주는거임 */
`

const PriorColorBackground = styled.div<{ color: string; delay: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ color }) => (color ? color : '#000')};
  animation: ${fade_out} ${colorChangeTime}s ${({ delay }) => delay}s linear forwards;
`
const WhiteBlur = styled.div<{ isFirstLoading: boolean; holdingTime: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  animation: ${fade_out} ${colorChangeTime}s ${({ holdingTime }) => holdingTime}s linear forwards;
`

const donut1 = keyframes`
    from {
        stroke-dasharray: 0, 100;
    }
    to {
        stroke-dasharray: 100, 0;
    }
`

const AnimatedMagsafe = styled(MagsafeSvg)<{ barcolor: string; delay: number }>`
  height: ${rem(350)};
  max-height: ${css`calc(100vh - ${rem(70)} - ${rem(10)})`}; // 뷰포트 - WhiteBlur 높이 - 여유분
  .donut-ring {
    opacity: 0.3;
  }
  .donut-segment-2 {
    stroke: ${({ barcolor }) => barcolor};
    animation: ${donut1} ${colorChangeTime}s ${({ delay }) => delay}s linear forwards;
  }
`

const Loader = ({ nextColor }: { nextColor: string }) => {
  const appContext: AppContextType = useContext(AppContext)
  const { loadingTime, currentThemeColor, setCurrentThemeColor }: AppContextType = appContext
  const isFirstLoading: boolean = currentThemeColor === null ? true : false

  useEffect(() => {
    window.scrollTo(0, 0)
    window.setTimeout(() => {
      setCurrentThemeColor(nextColor)
    }, loadingTime * 1000)
  }, [loadingTime, nextColor, setCurrentThemeColor])

  return (
    <NextColorBackground color={nextColor}>
      <PriorColorBackground color={currentThemeColor as string} delay={loadingTime / 3} />
      <WhiteBlur isFirstLoading={isFirstLoading} holdingTime={(loadingTime * 2) / 3}>
        <AnimatedMagsafe barcolor={nextColor} delay={loadingTime / 3}>
          {/* <MagsafeSvg /> */}
        </AnimatedMagsafe>
      </WhiteBlur>
    </NextColorBackground>
  )
}

export default Loader
