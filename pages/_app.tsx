import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"

import store from '../app/store'
import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </Provider>
  )
}

export default MyApp