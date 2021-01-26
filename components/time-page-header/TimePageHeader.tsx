import styles from './TimePageHeader.module.css'
import utils from '../../styles/utils.module.css'
import cn from 'classnames'
import { ReactNode } from 'react'

const TimePageHeader: React.FC = ({ children }) => {
  return (
    <div className={cn(styles.container, utils.playfair, utils.fontBold)}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}

export default TimePageHeader
