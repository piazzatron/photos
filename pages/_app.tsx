import '../styles/globals.css'
import { AppProps } from 'next/app'
import NavImageContextProvider from '../components/nav-image-context/NavImageContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavImageContextProvider>
      <Component {...pageProps} />
    </NavImageContextProvider>
  )
}

export default MyApp
