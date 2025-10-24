import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <MantineProvider>
      <header>
        <Navbar />
      </header>
    </MantineProvider>
  )
}

export default App
