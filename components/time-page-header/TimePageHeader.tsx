import styles from './TimePageHeader.module.css'
import utils from '../../styles/utils.module.css'
import cn from 'classnames'

const TimePageHeader = ({ text }: { text: string }) => {
  return (
    <div className={cn(styles.container, utils.montserrat, utils.fontBold)}>
      <div className={styles.inner}>life in {text}</div>
    </div>
  )
}

export default TimePageHeader
