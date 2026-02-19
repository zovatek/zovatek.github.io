import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const Hero = () => {
  const globeContainerRef = useRef(null)

  useEffect(() => {
    if (!globeContainerRef.current) return

    // Three.js Globe Setup
    const container = globeContainerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // On mobile, disable antialias and lower pixel ratio for performance
    const renderer = isMobile
      ? new THREE.WebGLRenderer({ alpha: true, antialias: false })
      : new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Globe
    // Use lower geometry detail on mobile for performance
    const isMobile = window.innerWidth < 768;
    const sphereSegments = isMobile ? 24 : 64;
    const geometry = new THREE.SphereGeometry(1.5, sphereSegments, sphereSegments)
    const material = new THREE.MeshBasicMaterial({
      color: 0x00b5e2,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    // Add Points
    const pointsGeometry = new THREE.BufferGeometry()
    const pointsCount = isMobile ? 400 : 1500
    const positions = new Float32Array(pointsCount * 3)

    for (let i = 0; i < pointsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x00b5e2,
      size: isMobile ? 0.012 : 0.02,
      transparent: true,
      opacity: 0.6,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(points)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      // Reduce animation speed on mobile for smoother experience
      if (isMobile) {
        globe.rotation.y += 0.003;
        globe.rotation.x += 0.0015;
        points.rotation.y -= 0.0015;
      } else {
        globe.rotation.y += 0.01;
        globe.rotation.x += 0.005;
        points.rotation.y -= 0.005;
      }
      renderer.render(scene, camera)
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

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
    hidden: { opacity: 0, y: 20 },
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface/30" />
      
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          <motion.div 
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-obsidian leading-tight mb-6"
              variants={itemVariants}
            >
              Engineering the Future of Digital Experiences
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-neutral/80 max-w-3xl leading-relaxed mb-8"
              variants={itemVariants}
            >
              Bridging creativity and technology for the modern era. We combine digital-native innovation with practical engineering to craft websites, applications, and visual systems.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4"
              variants={itemVariants}
            >
              <a 
                href="mailto:zovatek@gmail.com" 
                className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold w-full sm:w-auto text-center"
              >
                Start Your Project
              </a>
              <a 
                href="#services" 
                className="px-6 py-3 rounded-xl text-sm font-semibold text-obsidian border border-border hover:bg-surface transition-colors w-full sm:w-auto text-center"
              >
                View Services
              </a>
            </motion.div>
          </motion.div>

          {/* Globe Container */}
          <motion.div 
            className="w-full flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div 
              ref={globeContainerRef}
              className="w-full h-[400px] sm:h-[450px] md:h-[500px] cursor-grab gpu-accelerated"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
