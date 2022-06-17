import Layout from '../components/Layout'
import '../styles/globals.css'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <>
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </SessionProvider>
    </Provider>
  </>
}

export default MyApp
