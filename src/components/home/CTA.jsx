import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const CTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-24 bg-surface">
      <motion.div 
        className="max-w-screen-xl mx-auto px-6 lg:px-8 xl:px-12 text-center"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2 
          className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-obsidian mb-6"
          variants={itemVariants}
        >
          Ready to Build Something Great?
        </motion.h2>
        <motion.p 
          className="text-lg text-neutral mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Let's collaborate to create digital experiences that drive results and leave a lasting impression.
        </motion.p>
        <motion.a 
          href="mailto:zovatek@gmail.com" 
          className="btn-primary inline-block px-10 py-4 rounded-xl text-base font-semibold"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          Get In Touch
        </motion.a>
      </motion.div>
    </section>
  )
}

export default CTA
