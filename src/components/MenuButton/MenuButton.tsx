import * as React from 'react';
import styles from './MenuButton.module.scss'
import classNames from 'classnames/bind'

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  isClicked: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const MenuButton = ({ isClicked, onClick, ...props }: Props) => {
  const cx = classNames.bind(styles)

  return (
    <div {...props}>
      <button className={cx('button', { clicked: isClicked })} onClick={onClick} aria-label="메뉴버튼">
        <span className={styles.firstBar}></span>
        <span className={styles.secondBar}></span>
        <span className={styles.thirdBar}></span>
      </button>
    </div>
  )
}

export default MenuButton
