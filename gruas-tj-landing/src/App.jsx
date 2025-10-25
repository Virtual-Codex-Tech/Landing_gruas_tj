import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import Navbar from './components/Navbar'
import Somos from './components/Somos'
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
    </MantineProvider>
  )
}

export default App
