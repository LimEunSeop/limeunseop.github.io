import React, { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { AppContext, AppContextType } from 'App'
import { ReactComponent as MagsafeSvg } from './magsafe.svg'
import { rem } from 'utils/styledComponentUtils'

const colorChangeTime = 0.5

const fade_out = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const up_and_down = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(${rem(70)});
  }
`
const just_down = keyframes`
  from {
    transform: none;
  }
  to {
    transform: translateY(100%);
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
const WhiteBlur = styled.div<{ isFirstLoading: boolean; movingTime: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: ${({ isFirstLoading }) => (isFirstLoading ? 0 : rem(70))};
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${({ isFirstLoading }) => (isFirstLoading ? 0 : `${rem(30)} ${rem(30)} 0 0`)};
  transform: translateY(100%);
  animation: ${({ isFirstLoading, movingTime }) =>
    isFirstLoading
      ? css`
          ${just_down} ${movingTime}s cubic-bezier(1,0,.98,-0.16) forwards;
        `
      : css`
          ${up_and_down} ${movingTime / 2}s 2 cubic-bezier(0.08, 1.09, 0, 0.98) alternate;
        `};
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
  }, [])

  return (
    <NextColorBackground color={nextColor}>
      <PriorColorBackground color={currentThemeColor as string} delay={loadingTime / 2} />
      <WhiteBlur isFirstLoading={isFirstLoading} movingTime={loadingTime}>
        <AnimatedMagsafe barcolor={nextColor} delay={loadingTime / 2}>
          {/* <MagsafeSvg /> */}
        </AnimatedMagsafe>
      </WhiteBlur>
    </NextColorBackground>
  )
}

export default Loader
