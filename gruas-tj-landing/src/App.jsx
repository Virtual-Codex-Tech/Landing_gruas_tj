import { MantineProvider } from '@mantine/core'
import Navbar from './components/Navbar'
import Somos from './components/Somos'
import Servicios from './components/Servicios'
import Categorias from './components/Categorias'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <MantineProvider>
      <header>
        <Navbar />
      </header>
      <section id='somos'>
        <Somos />
      </section>
      <section id='servicios'>
        <Servicios />
        <Categorias />
      </section>
      <section id='contacto'>
        <Contacto />
      </section>
      <footer>
        <Footer />
      </footer>
    </MantineProvider>
  )
}

export default App
