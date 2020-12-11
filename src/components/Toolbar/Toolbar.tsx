import { Heading } from '@tenon-io/tenon-ui';
import { Link } from 'react-router-dom'
import AppNavigation from 'components/AppNavigtion/AppNavigation'
import styles from './Toolbar.module.scss'

interface Props {
  navItems: Array<{ display: string; link: string; color: string }>
}

const Toolbar = ({ navItems }: Props) => {
  return (
    <div className={styles.toolbar}>
      <Heading.H className={styles.logo}>
        <Link to="/">SEOP</Link>
      </Heading.H>

      <AppNavigation navItems={navItems} />
    </div>
  )
}

export default Toolbar
