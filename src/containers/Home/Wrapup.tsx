import { Heading } from '@tenon-io/tenon-ui';
import styles from './Wrapup.module.scss'

const Wrapup = () => {
  return (
    <Heading.LevelBoundary>
      <section className={styles.container}>
        <Heading.H>마무리</Heading.H>
        <p>저의 삶은 항상 깨달음의 연속이었습니다.</p>
        <p>모든 것으로부터 배우고자 하는 자세를 가졌고, 하루에 한 가지라도 깨닫도록 노력하는 삶을 살았습니다.</p>
        <p>그로 인하여 배움의 숭고함을 깊이 깨닫고 즐길 수 있게 되었습니다.</p>
        <p>이 광활한 우주와도 같은 개발의 세계에 저는 언제든지 여행할 준비가 되어 있습니다. 저와 여행을 하실 분은 언제든지 연락 주세요. 기다리겠습니다.</p>
      </section>
    </Heading.LevelBoundary>
  )
}

export default Wrapup
