import MenuButton from 'components/MenuButton/MenuButton'
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './AppNavigation.module.scss'
import classNames from 'classnames/bind'

interface Props {
  navItems: Array<{ display: string; link: string; color: string }>
}

const cx = classNames.bind(styles)

const AppNavigation = ({ navItems }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)

  useEffect(() => {
    if (isOpen === true) {
      setNavHidden(false)
    } else {
      window.setTimeout(() => {
        setNavHidden(true)
      }, 1000)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <MenuButton className={styles.menuButton} isClicked={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <nav className={cx('navBar', { opened: isOpen })} hidden={navHidden}>
        <ul className={styles.menuList}>
          {navItems.map((item) => (
            <li>
              <NavLink to={item.link} className={styles.navLink} activeClassName={styles.active}>
                {item.display}
                <div className={styles.decorator} aria-hidden="true" style={{ background: item.color + '90' }}></div>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={styles.contacts}>
          <li>github</li>
          <li>blog</li>
        </ul>
      </nav>
    </div>
  )
}

export default AppNavigation
