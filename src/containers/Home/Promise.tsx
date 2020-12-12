import { Heading } from '@tenon-io/tenon-ui'
import styles from './Promise.module.scss'

const Promise = () => {
  return (
    <section>
      <div className={styles.promiseBackground}>
        <Heading.H className="a11yHidden">다짐</Heading.H>
        <p className={styles.promiseTitle}>저는 개발자로서 3가지 다짐을 하였습니다.</p>
      </div>
      <Heading.LevelBoundary>
        <article className={styles.container}>
          <div className={styles.label} aria-hidden="true">
            1
          </div>
          <div className={styles.text}>
            <Heading.H className={styles.heading}>보이는 것만 신경쓰지 않겠습니다.</Heading.H>
            <p className={styles.paragraph}>
              대학시절부터 꾸준히 닦아온 프로그래밍 기본기를 바탕으로 앞으로도 계속 효율적이고 유지보수가 쉬운 코드를 작성하기 위해 고민하고, 프론트엔드 성능
              최적화에 관하여 또한 지속적인 관심을 기울이겠습니다.
            </p>
            <p className={styles.paragraph}>
              그리고 겉으로 보이는 UI에만 신경쓰는 것이 아닌 웹 접근성 및 웹 표준을 지키는 노력과 함께, 효율적이고 관리하기 쉬운 HTML 과 CSS 코드를 작성하기
              위한 연구도 이어나가겠습니다.
            </p>
          </div>
          {/* <div className={styles.image}>
          <img src={background_1} alt="" />
        </div> */}
        </article>
        <article className={styles.container}>
          {/* <div className={styles.image}>
          <img src={background_2} alt="" />
        </div> */}
          <div className={styles.label} aria-hidden="true">
            2
          </div>
          <div className={styles.text}>
            <Heading.H className={styles.heading}>무엇이든 그려내겠습니다.</Heading.H>
            <p className={styles.paragraph}>
              저는 웹 UI/UX 가 지닌 잠재성과 그 가치를 높게 사고 있습니다. 아이디어를 생각하고 그것을 웹 창에서 구현했을 때 커다란 즐거움을 느낍니다. 특히
              불가능 할것만 같았던 UX 를 고생끝에 구현했을 때 커다란 보람을 느끼고 있습니다.
            </p>
            <p className={styles.paragraph}>
              개발을 하다보면 기술적 한계로 인해, 의도하던 디자인이 구현되기 힘든 부분이 발생하여 디자이너와 개발자 사이의 간극이 존재하기도 합니다. 그 한계를
              극복하기 위하여 저는 공부할 때마다 본질을 바라보는 훈련을 계속 하고, 아이디어를 적극 수용하여 배우고 함께 만들어 나가는 개발자가 될 것입니다.
            </p>
          </div>
        </article>
        <article className={styles.container}>
          <div className={styles.label} aria-hidden="true">
            3
          </div>
          <div className={styles.text}>
            <Heading.H className={styles.heading}>꾸준히 배우고 성장하겠습니다.</Heading.H>
            <p className={styles.paragraph}>
              저는 모든 것으로부터 배우고자 하는 자세를 가지고, 하루에 한 가지라도 깨닫도록 노력하고 있습니다. 그로 인하여 배움의 숭고함을 깊이 깨닫고 즐길 수
              있게 되었고, 이 드넓은 개발의 세계에서 두려움 없이 차근차근 나아갈 수 있는 힘을 가지게 되었습니다.
            </p>
            <p className={styles.paragraph}>
              이제 모든 준비는 마쳤습니다. 아무리 험난한 길이 제 앞에 놓일 지라도 지치지 않고 부담 가지지 않고 즐기는 자세를 가질 것입니다.
            </p>
          </div>
          {/* <div className={styles.image}>
          <img src="" alt="" />
        </div> */}
        </article>
      </Heading.LevelBoundary>
    </section>
  )
}

export default Promise
