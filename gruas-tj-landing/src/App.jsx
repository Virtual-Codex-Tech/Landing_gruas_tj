import { MantineProvider } from '@mantine/core'
import Buttons from './ui/buttons'
import Navbar from './components/Navbar'
import Banner from './components/banner'
import './App.css'

function App() {
  return (
    <MantineProvider>
      <header>
        <Navbar />
      </header>
      <section className='inicio'>
      <Banner/>
      </section>
    </MantineProvider>
  )
}

export default App
