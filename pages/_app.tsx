import '../styles/globals.css'
import { AppProps } from 'next/app'
import NavImageContextProvider from '../components/nav-image-context/NavImageContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NavImageContextProvider>
        <Component {...pageProps} />
      </NavImageContextProvider>
    </>
  )
}

export default MyApp
