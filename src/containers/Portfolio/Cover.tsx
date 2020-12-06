import React, { forwardRef } from 'react'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Cover.module.scss'
import withCoverAnimate from 'hoc/withCoverAnimate'

interface Props {
  coverColor: string
}

const Cover = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.content}>
        <div className={styles.cover} style={{ backgroundColor: props.coverColor }}>
          <div className={styles.coverLetter} aria-hidden="true">
            <span>Port</span>
            <span>Folio</span>
          </div>
        </div>
        <Heading.H className="a11yHidden">포트폴리오</Heading.H>
        <p className={styles.description}>
          포트폴리오가 될만한 제 공부사항,
          <br />
          활동을 최대한 모아봤습니다.
        </p>
      </div>
    </div>
  )
})

export default withCoverAnimate<Props>(Cover, styles.animate)
