import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import Navbar from './components/Navbar'
import Somos from './components/Somos'
import Servicios from './components/Servicios'
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
      </section>
    </MantineProvider>
  )
}

export default App
