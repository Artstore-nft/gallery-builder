import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"

import store from '../app/store'
import '../styles/globals.css'
import Layout from '../components/Layout/Layout'

function MyApp({ Component, pageProps }) {
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