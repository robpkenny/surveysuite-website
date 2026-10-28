import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import Demos from './pages/Demos'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'

// When adding a route here, also add it to staticwebapp.config.json and public/sitemap.xml.
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/demos" element={<Demos />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
