import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/home/Hero'
import About from './components/home/About'
import Solutions from './components/home/Solutions'
import CTA from './components/home/CTA'

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <About />
                <Solutions />
                <CTA />
              </>
            } 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
