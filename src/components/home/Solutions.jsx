import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Solutions = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="services" className="py-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2 }}
        >
          <span className="inline-block text-sm font-semibold text-cerulean uppercase tracking-wide mb-4">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-obsidian mb-6">
            Our Solutions
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            Comprehensive digital solutions tailored for startups and forward-thinking brands.
          </p>
        </motion.div>
        
        {/* Service Rows Wrapper */}
        <motion.div 
          className="flex flex-col gap-24 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          
          {/* ROW 1: Web Development (Text Left, Visual Right) */}
          <motion.div 
            id="web-development" 
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={cardVariants}
          >
              {/* Left Column: Text */}
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-obsidian mb-6">
                  Web Development
                </h3>
                <p className="text-neutral leading-relaxed text-lg mb-8">
                  We build fast, scalable, and beautifully designed websites and web applications. From marketing sites to complex SaaS platforms, our engineering-first approach ensures your digital product performs flawlessly.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'JavaScript', 'Node.js'].map((tech) => (
                    <motion.span 
                      key={tech}
                      className="px-4 py-2 text-sm font-medium text-neutral bg-surface rounded-full border border-border"
                      whileHover={{ scale: 1.05, borderColor: '#00B5E2' }}
                      transition={{ type: 'spring', stiffness: 400, duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            
            {/* Right Column: Browser Window Visual */}
            <BrowserMockup />
          </motion.div>
          
          {/* ROW 2: Visual Identity (Visual Left, Text Right) */}
          <motion.div 
            id="visual-design" 
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={cardVariants}
          >
            {/* Left Column: Swiss Grid Composition */}
            <VisualIdentityMockup />
            
            {/* Right Column: Text */}
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-obsidian mb-6">
                Visual Identity
              </h3>
              <p className="text-neutral leading-relaxed text-lg mb-8">
                We craft distinctive visual identities that communicate your brand's essence. From logo design and poster artwork to cohesive visual systems, we deliver assets that make your brand unforgettable.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Logo Design', 'Poster Design', 'Visual Design'].map((service) => (
                  <motion.span 
                    key={service}
                    className="px-4 py-2 text-sm font-medium text-neutral bg-surface rounded-full border border-border"
                    whileHover={{ scale: 1.05, borderColor: '#00B5E2' }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* ROW 3: Portfolios (Text Left, Visual Right) */}
          <motion.div 
            id="portfolios" 
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={cardVariants}
          >
            {/* Left Column: Text */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-obsidian mb-6">
                Portfolios
              </h3>
              <p className="text-neutral leading-relaxed text-lg mb-8">
                A curated gallery of our finest work across web and brand engineering.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Case Studies', 'UI Gallery', 'Live Projects'].map((type) => (
                  <motion.span 
                    key={type}
                    className="px-4 py-2 text-sm font-medium text-neutral bg-surface rounded-full border border-border"
                    whileHover={{ scale: 1.05, borderColor: '#00B5E2' }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {type}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Right Column: Portfolio Scroll */}
            <PortfolioScrollMockup />
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  )
}

// Browser Window Mockup Component
const BrowserMockup = () => {
  return (
    <div className="bg-surface border border-border rounded-3xl h-[400px] overflow-hidden relative">
      <div className="relative w-full h-full bg-surface p-8 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="w-full max-w-[320px] bg-white rounded-lg shadow-sm border border-border overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Browser Chrome - macOS window controls */}
          <div className="bg-surface px-4 py-3 border-b border-border flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <div className="ml-4 flex-1 bg-white rounded px-3 py-1 border border-border shadow-sm overflow-hidden">
              <div className="font-mono text-[10px] sm:text-xs text-obsidian whitespace-nowrap overflow-hidden border-r-2 border-cerulean w-fit animate-typing">
                zovatek.com/growth
              </div>
            </div>
          </div>
          {/* Browser Content */}
          <div className="p-6 space-y-4 bg-white">
            <motion.div 
              className="h-4 bg-surface rounded w-3/4"
              initial={{ width: 0 }}
              whileInView={{ width: '75%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.div 
              className="h-4 bg-surface rounded w-1/2"
              initial={{ width: 0 }}
              whileInView={{ width: '50%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <div className="grid grid-cols-3 gap-2 mt-4">
              <motion.div 
                className="h-16 bg-surface rounded border border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
              <motion.div 
                className="h-16 bg-cerulean/10 rounded border border-cerulean/30"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 181, 226, 0.2)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
              <motion.div 
                className="h-16 bg-surface rounded border border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            </div>
            <motion.div 
              className="h-3 bg-cerulean rounded w-1/3 mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: '33%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Visual Identity Mockup Component
const VisualIdentityMockup = () => {
  return (
    <div className="bg-surface border border-border rounded-3xl h-[400px] overflow-hidden order-2 lg:order-1">
      <div className="relative w-full h-full bg-surface flex items-center justify-center overflow-hidden">
        {/* FLOATING SHAPES (Background Layer) - HIDDEN ON MOBILE */}
        <motion.div 
          className="hidden md:block absolute top-8 right-12 w-24 h-24 rounded-full border-2 border-obsidian opacity-40"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="hidden md:block absolute top-1/2 left-1/3 w-16 h-16 bg-obsidian opacity-50"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{ 
            y: [0, 15, 0],
            x: [0, -20, 0],
            rotate: [0, 120, 240, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="hidden md:block absolute bottom-12 left-10 grid grid-cols-3 gap-2 opacity-30"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          {Array(9).fill(null).map((_, i) => (
            <span key={i} className="text-obsidian text-lg font-bold">+</span>
          ))}
        </motion.div>
        
        {/* Brand Poster Canvas */}
        <motion.div 
          className="relative w-48 h-64 bg-white shadow-2xl p-5 flex flex-col justify-between overflow-hidden z-10 gpu-accelerated"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
        >
          {/* Dot Grid Background */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'radial-gradient(#050505 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />
          
          {/* Header Bar - Black */}
          <motion.div 
            className="w-full h-8 bg-obsidian z-10 gpu-accelerated"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Main Content Area */}
          <div className="flex gap-3 h-24 z-10">
            {/* Cyan Hero Block */}
            <motion.div 
              className="w-2/3 h-full bg-cerulean gpu-accelerated"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            
            {/* Right Side Elements */}
            <div className="w-1/3 flex flex-col justify-end gap-1">
              <motion.div 
                className="h-2 w-full bg-border gpu-accelerated"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              />
              <motion.div 
                className="h-2 w-2/3 bg-border gpu-accelerated"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
              <motion.div 
                className="h-8 w-full bg-obsidian mt-auto gpu-accelerated"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
            </div>
          </div>

          {/* Footer Elements */}
          <div className="flex justify-between items-end z-10">
            <motion.div 
              className="h-3 w-12 bg-border gpu-accelerated"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />
            <motion.div 
              className="h-6 w-6 rounded-full border-2 border-obsidian gpu-accelerated"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Portfolio Scroll Mockup Component
const PortfolioScrollMockup = () => {
  const portfolioItems1 = [
    { height: 'h-24', featured: false },
    { height: 'h-32', featured: true },
    { height: 'h-20', featured: false },
    { height: 'h-32', featured: true },
  ]

  const portfolioItems2 = [
    { height: 'h-28', featured: false },
    { height: 'h-32', featured: true },
    { height: 'h-32', featured: true },
  ]

  return (
    <div className="bg-surface border border-border rounded-3xl h-[300px] sm:h-[400px] overflow-hidden">
      <div className="relative w-full h-full bg-surface overflow-hidden flex justify-center gap-4 px-4 sm:px-8">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none" />

        {/* First Column */}
        <div className="flex flex-col gap-4 w-1/2 animate-scrollUp [animation-duration:30s] sm:[animation-duration:20s] gpu-accelerated">
          {[...portfolioItems1, ...portfolioItems1].map((item, idx) => (
            <PortfolioCard key={idx} height={item.height} featured={item.featured} />
          ))}
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-4 w-1/2 mt-12 animate-scrollUpSlow [animation-duration:25s] sm:[animation-duration:15s] gpu-accelerated">
          {[...portfolioItems2, ...portfolioItems2].map((item, idx) => (
            <PortfolioCard key={idx} height={item.height} featured={item.featured} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Portfolio Card Component
const PortfolioCard = ({ height, featured }) => {
  return (
    <motion.div 
      className={`bg-white p-3 rounded-xl shadow-sm border ${
        featured ? 'border-cerulean/50 hero-card-glow' : 'border-border'
      } relative`}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className={`relative ${height} ${
        featured 
          ? 'bg-gradient-to-br from-cerulean to-cerulean/70' 
          : 'bg-surface'
      } rounded-lg mb-2`}>
        {featured && (
          <motion.div 
            className="absolute top-2 left-3 w-10 h-10 rounded-full bg-white border-2 border-white shadow-md z-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
          />
        )}
      </div>
      <div className={`h-2 ${
        featured ? 'bg-cerulean/30 w-1/3' : 'bg-border w-1/2'
      } rounded mt-4`} />
    </motion.div>
  )
}

export default Solutions
