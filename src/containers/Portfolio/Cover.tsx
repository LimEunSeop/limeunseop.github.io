import { forwardRef } from 'react'
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
          앞으로의 모든 활동은 이 곳에 인덱싱 할 예정입니다.
          <br />
          아래의 버튼을 눌러 포트폴리오 페이지로 이동해주세요.
        </p>
        <div className={styles.linkWrapper}>
          <a className={styles.link} href="//github.com/limeunseop/my-portfolio" target="_blank" rel="noreferrer">
            Go to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
})

Cover.displayName = 'PortfolioCover'

export default withCoverAnimate<Props>(Cover, styles.animate)
