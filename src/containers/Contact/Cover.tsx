import { forwardRef } from 'react';
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Cover.module.scss'
import withCoverAnimate from 'hoc/withCoverAnimate'
import EmailForm from 'components/EmailForm/EmailForm'

interface Props {
  coverColor: string
}

const Cover = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.content}>
        <div className={styles.cover} style={{ backgroundColor: props.coverColor }}>
          <div className={styles.coverLetter} aria-hidden="true">
            <span>CON</span>
            <span>TACT</span>
          </div>
        </div>
        <Heading.H className="a11yHidden">Contact</Heading.H>
        <p className={styles.description}>
          문의하실 사항이 있을 경우
          <br />
          아래의 양식을 작성 하시어
          <br />
          연락 바랍니다.
        </p>
        <EmailForm className={styles.form} />
      </div>
    </div>
  )
})

export default withCoverAnimate<Props>(Cover, styles.animate)
