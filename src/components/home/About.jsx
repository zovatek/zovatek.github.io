import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="about" className="py-24 bg-surface relative overflow-hidden">
      {/* Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: 'radial-gradient(#050505 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12 relative z-10" ref={ref}>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="max-w-xl" variants={itemVariants}>
            <span className="text-cerulean font-bold tracking-widest text-xs uppercase mb-2 block">
              Our Story
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-obsidian sm:text-5xl mb-6">
              Engineering the Gap Between Art and Logic.
            </h2>
            <div className="space-y-6 text-lg text-neutral/80 leading-relaxed">
              <p>
                ZOVA TEK started with a single observation: The digital world is divided. 
                Most agencies either offer beautiful designs that break under pressure, or robust code that looks like it belongs in 2010. 
                We refused to choose.
              </p>
              <p>
                We built a studio where designers think like engineers, and developers dream like artists. 
                Today, we don't just build websites; we construct digital infrastructures that define brands and drive measurable growth.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <motion.img 
              src="/images/aboutus.png" 
              alt="Zova Tek Studio" 
              className="w-3/4 max-w-sm h-auto rounded-2xl object-cover shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
