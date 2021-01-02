import styles from './WorkPage.module.css'
import StandardPageWrapper from '../../components/standard-page-wrapper/StandardPageWrapper'
import FancyLink from '../../components/fancy-link/FancyLink'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'

const WorkPage = () => {
  return (
    <StandardPageWrapper headTitle="Work" title="Work">
      <div className={styles.container}>
        <img src="/construction.jpg" className={styles.image} />
        <div className={styles.rightContainer}>
          <div className={styles.warning}>{'🚧'}</div>
          <div
            className={cn(
              styles.header,
              utils.playfair,
              utils.fontWeightRegular,
            )}
          >
            This page is under construction.
          </div>
          <div
            className={cn(
              styles.subtitle,
              utils.montserrat,
              utils.fontWeightRegular,
            )}
          >
            For now, you can find my work on{' '}
            <FancyLink href="https://instagram.com/piazzatron" colored>
              instagram.
            </FancyLink>
          </div>
          <div className={cn(styles.warning, styles.desktop)}>{'🚧'}</div>
        </div>
      </div>
    </StandardPageWrapper>
  )
}

export default WorkPage
