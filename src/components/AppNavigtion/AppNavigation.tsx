import MenuButton from 'components/MenuButton/MenuButton'
import { useCallback, useContext, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './AppNavigation.module.scss'
import classNames from 'classnames/bind'
import { AppContext } from 'App'

interface Props {
  navItems: Array<{ display: string; link: string; color: string }>
  // open: boolean
}

const cx = classNames.bind(styles)

const AppNavigation = ({ navItems }: Props) => {
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [active, setActive] = useState(false)

  const { currentThemeColor } = useContext(AppContext)

  const timeoutID = useRef<number | null>(null)

  const menuButtonClickHandler = useCallback(() => {
    if (clicked === false) {
      setClicked(true)
      setHidden(false)
      window.clearTimeout(timeoutID.current as number)
      timeoutID.current = window.setTimeout(() => {
        setActive(true)
      }, 100)
    } else {
      setClicked(false)
      setActive(false)
      window.clearTimeout(timeoutID.current as number)
      timeoutID.current = window.setTimeout(() => {
        setHidden(true)
      }, 1100)
    }
  }, [clicked])

  return (
    <div className={styles.wrapper}>
      <MenuButton className={styles.menuButton} isClicked={clicked} onClick={menuButtonClickHandler} />
      <div className={cx('navBarBackground', { active })} style={{ backgroundColor: currentThemeColor as string }} hidden={hidden}></div>
      <nav className={cx('navBar', { active })} hidden={hidden}>
        <ul className={styles.menuList}>
          {navItems.map((item, i) => (
            <li key={i}>
              <NavLink to={item.link} className={styles.navLink} activeClassName={styles.active} onClick={menuButtonClickHandler}>
                {item.display}
                <div className={styles.decorator} aria-hidden="true" style={{ background: item.color + '90' }}></div>
              </NavLink>
            </li>
          ))}
        </ul>
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
      </nav>
    </div>
  )
}

AppNavigation.displayName = 'AppNavigation'

export default AppNavigation
