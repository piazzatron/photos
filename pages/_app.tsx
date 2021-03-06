import '../styles/globals.css'
import { AppProps } from 'next/app'
import NavImageContextProvider from '../components/nav-image-context/NavImageContext'
import Head from 'next/head'
import StateProvider from '../components/state-provider/StateProvider'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1.0"
        />
      </Head>
      <DefaultSeo
        title="Michael Piazza Photography"
        description="Michael Piazza's work and photojournal. Shot mostly on Fuji X."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://www.piazza.photos/',
          site_name: 'Michael Piazza Photography',
          images: [
            {
              url:
                'https://res.cloudinary.com/dlf6ppjiw/image/upload/c_scale,q_100,w_900/piazza.photos/1_i8exof.jpg',
              height: 600,
              width: 900,
            },
          ],
        }}
        twitter={{
          handle: '@piazzatron',
          cardType: 'summary_large_image',
        }}
      />
      <NavImageContextProvider>
        <StateProvider>
          <Component {...pageProps} />
        </StateProvider>
      </NavImageContextProvider>
    </>
  )
}

export default MyApp
