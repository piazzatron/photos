import '../styles/globals.css'
import { AppProps } from 'next/app'
import NavImageContextProvider from '../components/nav-image-context/NavImageContext'
import Head from 'next/head'
import StateProvider from '../components/state-provider/StateProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1.0"
        />
      </Head>
      <NavImageContextProvider>
        <StateProvider>
          <Component {...pageProps} />
        </StateProvider>
      </NavImageContextProvider>
    </>
  )
}

export default MyApp
