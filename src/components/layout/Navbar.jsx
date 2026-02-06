import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src="/assets/images/wordmarkweb1.png" alt="ZOVA TEK" className="logo-image" />
          </a>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="nav-link text-sm font-medium">
              About Us
            </a>
            
            {/* Solutions Dropdown */}
            <div className="relative group">
              <a href="#services" className="nav-link text-sm font-medium inline-flex items-center gap-1">
                Solutions
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </a>
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                <div className="py-2">
                  <a href="#web-development" className="block px-4 py-2 text-sm text-neutral hover:bg-gray-50 hover:text-cerulean transition-colors">
                    Web Development
                  </a>
                  <a href="#visual-design" className="block px-4 py-2 text-sm text-neutral hover:bg-gray-50 hover:text-cerulean transition-colors">
                    Visual Identity
                  </a>
                  <a href="#portfolios" className="block px-4 py-2 text-sm text-neutral hover:bg-gray-50 hover:text-cerulean transition-colors">
                    Portfolios
                  </a>
                </div>
              </div>
            </div>
            
            <a href="#contact" className="nav-link text-sm font-medium">
              Contact
            </a>
          </div>
          
          {/* CTA Button */}
          <a href="mailto:zovatek@gmail.com" className="hidden md:block btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold">
            Start Project
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2" 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu with Framer Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-4 pb-4 border-t border-border pt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <a 
                  href="#about" 
                  className="text-sm font-medium text-neutral hover:text-obsidian"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                
                {/* Mobile Solutions Submenu */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-obsidian">Solutions</span>
                  <div className="pl-4 flex flex-col gap-2 border-l-2 border-gray-200">
                    <a 
                      href="#web-development" 
                      className="text-sm text-neutral hover:text-cerulean transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Web Development
                    </a>
                    <a 
                      href="#visual-design" 
                      className="text-sm text-neutral hover:text-cerulean transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Visual Identity
                    </a>
                    <a 
                      href="#portfolios" 
                      className="text-sm text-neutral hover:text-cerulean transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Portfolios
                    </a>
                  </div>
                </div>
                
                <a 
                  href="#contact" 
                  className="text-sm font-medium text-neutral hover:text-obsidian"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                
                <a 
                  href="mailto:zovatek@gmail.com" 
                  className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
                >
                  Start Project
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
