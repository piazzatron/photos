import Head from 'next/head'
import Layout from '../layout/layout'
import styles from './StandardPageWrapper.module.css'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'

type StandardPageWrapperProps = {
  title: string
  headTitle: string
}

const StandardPageWrapper: React.FC<StandardPageWrapperProps> = ({
  title,
  headTitle,
  children,
}) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>{headTitle}</title>
        </Head>
      </div>
      <div className={styles.container}>{children}</div>
    </Layout>
  )
}

export default StandardPageWrapper
