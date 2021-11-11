import MenuButton from 'components/MenuButton/MenuButton'
import { useCallback, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './AppNavigation.module.scss'
import classNames from 'classnames/bind'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'store/rootReducer'
import styled from 'styled-components'

interface Props extends PropsFromRedux {
  navItems: Array<{ display: string; link: string }>
  // open: boolean
}

const LinkDecorator = styled.div<{ themeName: string }>`
  background: ${({ theme, themeName }) => theme[themeName].mainColor}90;
`

const NavBarBackground = styled.div<{ themeName: string | null }>`
  background-color: ${({ theme, themeName }) => (themeName ? theme[themeName].mainColor : null)};
`

const cx = classNames.bind(styles)

const AppNavigation = ({ navItems, currentTheme }: Props) => {
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [active, setActive] = useState(false)

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
      <NavBarBackground className={cx('navBarBackground', { active })} themeName={currentTheme} hidden={hidden}></NavBarBackground>
      <nav className={cx('navBar', { active })} hidden={hidden}>
        <ul className={styles.menuList}>
          {navItems.map((item, i) => {
            const themeName = item.link
            return (
              <li key={i}>
                <NavLink to={item.link} className={styles.navLink} activeClassName={styles.active} onClick={menuButtonClickHandler}>
                  {item.display}
                  <LinkDecorator className={styles.decorator} aria-hidden="true" themeName={themeName}></LinkDecorator>
                </NavLink>
              </li>
            )
          })}
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

const mapStateToProps = ({ app: { theme } }: RootState) => ({
  currentTheme: theme,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AppNavigation)
