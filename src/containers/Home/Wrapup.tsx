import { Link } from 'react-router-dom'
import styles from './Wrapup.module.scss'

const Wrapup = () => {
  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <div className={styles.thanks}>
          <p>감사합니다.</p>
        </div>
        <div className={styles.nav}>
          <p>좀 더 자세한 정보를 알고 싶으시면?</p>
          <Link to="/about">About</Link>
          <p>포트폴리오를 열람하고 싶으시면?</p>
          <Link to="/portfolio">Portfolio</Link>
          <p>블로그를 보고 싶으시면?</p>
          <Link to="/blog">Blog</Link>
          <p>연락을 희망하신다면?</p>
          <Link to="/contact">Contact</Link>
          <p>클릭 해주시기 바랍니다.</p>
        </div>
      </div>
      <div className={styles.row}>
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
      </div>
    </section>
  )
}

Wrapup.displayName = 'Wrapup'

export default Wrapup
