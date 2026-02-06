import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12">
        
        {/* Top Row: Logo & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <motion.a 
            href="#" 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src="/assets/images/wordmarkweb1.png" alt="ZOVA TEK" className="logo-image" />
          </motion.a>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <motion.a 
              href="mailto:zovatek@gmail.com" 
              className="text-lg font-medium text-obsidian hover:text-cerulean transition-colors duration-300 no-underline"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              zovatek@gmail.com
            </motion.a>
            <motion.a 
              href="https://instagram.com/zovatek" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-cerulean transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Instagram
            </motion.a>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="border-t border-gray-50 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2026 ZOVA TEK. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
