import '../styles/globals.css'
import Layout from '../components/Layout'

// "Component" é envolto por Layout(que carrega consigo o head, navbar, footer)
// "Component" é a página inicial ou a página "sobre"(index.js ou about.js) 
function MyApp({ Component, pageProps }) {
  return (
		 <Layout>
			<Component {...pageProps} />
		 </Layout>
	)
}

export default MyApp
