import styles from './Testimonials.module.scss'
import { Heading } from '@tenon-io/tenon-ui'

const Testimonials = () => {
  return (
    <section className={styles.container}>
      <Heading.H className={styles.Heading}>추천인</Heading.H>
      <p>한 고마운 분께서 저의 잠재성을 높게 사주셨습니다.</p>
      <figure className={styles.mainText}>
        <blockquote cite="https://www.rocketpunch.com/@eunseoplim/resume#references">
          <p>
            임은섭님과의 만남은 이듬 블렌디드 러닝에서 였습니다. 은섭님은 이듬 교육 이전에도 패스트 캠퍼스에서 진행했던 교육을 수강한 적이 있었습니다. 은섭님은
            제가 10여년 간 강의를 하면서 만난 수강생 중 단연 발군인 학생입니다.
          </p>
          <p>
            다른 수강생과 달리 핵심을 짚는 능력이 뛰어나며, 문제가 해결될 때까지 달려들어 쟁취하는 전투적인 성향을 보였습니다. 그러한 전투적인 성향 덕분에
            은섭님의 질문에 답변하며 저 또한 레벨 업을 하게 되었죠. 보지 않았던 혹은 볼 수 없었던 영역에 눈을 뜰 수 있는 질문에 인상 깊었습니다.
          </p>
          <p>
            무엇보다 주어진 대로 받아들이는 것이 아니라, 연구 하고 나름의 결론에 도달하기까지 많은 노력을 한다는 점에 높은 점수를 주고 싶습니다. 그의 발전
            가능성과 잠재력을 측정하기 어렵지만 일반적이진 않을 것으로 생각됩니다.
          </p>
          <p>
            물론 회사 입장에서 보면 `시키는 대로 하는 사람`을 선호할 지 모르겠으나, `스스로 생각하고 행동하는 사람`과 함께 일하고 싶다면? 은섭님을 추천하고
            싶습니다. 다소 시간이 걸리더라도 보다 나은 결과를 이끌어 낼 수 있는 그를 눈 여겨 보고 아껴줄 수 있는 분과 만나길 기대합니다.
          </p>
          <p>
            다만, 강사와 학생으로만 만나 그의 성향에 대해서는 잘 모릅니다. 다소 조용한 성격이고 생각을 깊게 하고 말을 꺼냈던 것으로 기억합니다. 신중한 유형의
            성격을 가졌다고 생각합니다.
          </p>
          <p>밝고 명랑 쾌활한 성격 보다, 신중하고 맡은 바 업무에 최선을 다해 책임있게 행동하는 사람을 생각하신다면 은섭님과 만나 이야기 해보시길 바랍니다.</p>
        </blockquote>
        <figcaption>
          <cite>
            <div className={styles.author}>야무</div>
            <div className={styles.belong}>대표, 이듬</div>
          </cite>
        </figcaption>
      </figure>
    </section>
  )
}

export default Testimonials
