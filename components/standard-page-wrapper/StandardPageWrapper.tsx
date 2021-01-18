import Head from 'next/head'
import Layout from '../layout/layout'
import styles from './StandardPageWrapper.module.css'

type StandardPageWrapperProps = {
  headTitle: string
}

const StandardPageWrapper: React.FC<StandardPageWrapperProps> = ({
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
