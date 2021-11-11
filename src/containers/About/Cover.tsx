import { forwardRef } from 'react'
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Cover.module.scss'
import withCoverAnimate from 'hoc/withCoverAnimate'
import CoverObject from 'components/CoverObject'

interface Props {
  themeName: string
}

const Cover = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.content}>
        <CoverObject className={styles.cover} themeName={props.themeName}>
          <div className={styles.coverLetter} aria-hidden="true">
            <span>ABO</span>
            <span>UT</span>
          </div>
        </CoverObject>
        <Heading.H className={styles.name}>Eunseop Lim</Heading.H>
        <div className={styles.description}>
          <p className={styles.position}>Interactive Front-end Developer</p>
          <ul className={styles.contacts}>
            <li>
              <a href="mailto:dmstjq92@gmail.com">
                <span className="a11yHidden">이메일</span>
                <i className="fas fa-envelope-square"></i>
              </a>
            </li>
            <li>
              <a href="//github.com/limeunseop" target="_blank" rel="noreferrer">
                <span className="a11yHidden">깃헙</span>
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a href="//dmstjq92.medium.com/" target="_blank" rel="noreferrer">
                <span className="a11yHidden">블로그</span>
                <i className="fab fa-medium"></i>
              </a>
            </li>
          </ul>
          <a className={styles.cvLink} href="//github.com/limeunseop/my-resume" target="_blank" rel="noreferrer">
            텍스트 버전 이력서 보기
          </a>
        </div>
      </div>
    </div>
  )
})

Cover.displayName = 'AboutCover'

export default withCoverAnimate<Props>(Cover, styles.animate)
