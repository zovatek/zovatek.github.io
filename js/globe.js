/**
 * globe.js
 * ==========================================================================
 * Dotted Data Globe for Zovatek Website
 * 
 * Purpose: Creates an interactive 3D globe visualization using Three.js
 * with a geometric icosahedron shape featuring "data dots" and a faint
 * wireframe grid that rotates slowly and responds to user interaction.
 * 
 * Features:
 * - Icosahedron geometry for sharp geometric aesthetic
 * - Dual-layer: Data dots + Ghost grid wireframe
 * - Cinematic slow auto-rotation
 * - Mouse/touch interaction for manual rotation
 * - Responsive canvas that adapts to container size
 * - Transparent background for seamless integration
 * 
 * Dependencies:
 * - Three.js (loaded via CDN in HTML)
 * ==========================================================================
 */

// ==========================================================================
// Globe Configuration
// ==========================================================================

const GLOBE_CONFIG = {
  // Geometry
  radius: 2.8,
  detail: 2,                 // Icosahedron detail level (sharper geometric look)
  
  // Data Dots Material
  dotColor: 0x00B5E2,        // Brand Cyan
  dotSize: 0.15,             // Small distinct dots
  dotOpacity: 0.8,
  
  // Ghost Grid Material
  wireframeColor: 0x00B5E2,
  wireframeOpacity: 0.05,    // Very faint lines connecting the dots
  
  // Animation
  autoRotateSpeed: 0.002,    // Slow cinematic rotation
  
  // Interaction
  dampingFactor: 0.95,       // Momentum decay
  dragSensitivity: 0.005,    // Mouse drag sensitivity
  hoverInfluence: 0.0008,    // Subtle hover influence
};

// ==========================================================================
// Globe Class
// ==========================================================================

class DottedGlobe {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      console.warn('globe.js: Container not found:', containerId);
      return;
    }
    
    // State
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    
    this.init();
    this.createGlobe();
    this.setupEventListeners();
    this.animate();
  }
  
  /**
   * Initialize Three.js scene, camera, and renderer
   */
  init() {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera - Perspective for depth
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.z = 8;
    
    // Renderer with transparency
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0); // Transparent background
    
    this.container.appendChild(this.renderer.domElement);
  }
  
  /**
   * Create the geometric globe with data dots and ghost grid
   */
  createGlobe() {
    // 1. Create the Geometry (The Shape) - Icosahedron for sharp geometric look
    const geometry = new THREE.IcosahedronGeometry(
      GLOBE_CONFIG.radius,
      GLOBE_CONFIG.detail
    );
    
    // 2. The "Data Dots" Material (The Atoms)
    const dotsMaterial = new THREE.PointsMaterial({
      color: GLOBE_CONFIG.dotColor,
      size: GLOBE_CONFIG.dotSize,
      transparent: true,
      opacity: GLOBE_CONFIG.dotOpacity,
      sizeAttenuation: true // Dots get smaller when further away
    });
    
    // 3. The "Ghost Grid" Material (The Network)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: GLOBE_CONFIG.wireframeColor,
      wireframe: true,
      transparent: true,
      opacity: GLOBE_CONFIG.wireframeOpacity // Very faint lines connecting the dots
    });
    
    // 4. Create the Objects
    const dots = new THREE.Points(geometry, dotsMaterial);
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    
    // 5. Add to a Group (So they spin together)
    this.globeGroup = new THREE.Group();
    this.globeGroup.add(dots);
    this.globeGroup.add(wireframe);
    
    // Slight initial tilt for visual interest
    this.globeGroup.rotation.x = 0.3;
    this.globeGroup.rotation.z = 0.1;
    
    this.scene.add(this.globeGroup);
  }
  
  /**
   * Setup mouse/touch event listeners for interaction
   */
  setupEventListeners() {
    // Mouse events
    this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.container.addEventListener('mouseup', () => this.onMouseUp());
    this.container.addEventListener('mouseleave', () => this.onMouseUp());
    
    // Touch events for mobile
    this.container.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    this.container.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });
    this.container.addEventListener('touchend', () => this.onMouseUp());
    
    // Window resize
    window.addEventListener('resize', () => this.onResize());
  }
  
  /**
   * Mouse down handler - start dragging
   */
  onMouseDown(event) {
    this.isDragging = true;
    this.previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
    this.container.style.cursor = 'grabbing';
  }
  
  /**
   * Mouse move handler - rotate globe or apply hover influence
   */
  onMouseMove(event) {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    if (this.isDragging) {
      // Drag rotation
      const deltaX = event.clientX - this.previousMousePosition.x;
      const deltaY = event.clientY - this.previousMousePosition.y;
      
      this.rotationVelocity.y = deltaX * GLOBE_CONFIG.dragSensitivity;
      this.rotationVelocity.x = deltaY * GLOBE_CONFIG.dragSensitivity;
      
      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    } else {
      // Subtle hover influence
      const offsetX = (event.clientX - centerX) / rect.width;
      const offsetY = (event.clientY - centerY) / rect.height;
      
      this.targetRotation.y = offsetX * GLOBE_CONFIG.hoverInfluence;
      this.targetRotation.x = offsetY * GLOBE_CONFIG.hoverInfluence;
    }
  }
  
  /**
   * Mouse up handler - stop dragging
   */
  onMouseUp() {
    this.isDragging = false;
    this.container.style.cursor = 'grab';
  }
  
  /**
   * Touch start handler
   */
  onTouchStart(event) {
    if (event.touches.length === 1) {
      this.isDragging = true;
      this.previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }
  }
  
  /**
   * Touch move handler
   */
  onTouchMove(event) {
    if (this.isDragging && event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = event.touches[0].clientY - this.previousMousePosition.y;
      
      this.rotationVelocity.y = deltaX * GLOBE_CONFIG.dragSensitivity;
      this.rotationVelocity.x = deltaY * GLOBE_CONFIG.dragSensitivity;
      
      this.previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }
  }
  
  /**
   * Handle window resize
   */
  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (!this.globeGroup) return;
    
    // Auto-rotation (cinematic slow)
    this.globeGroup.rotation.y += GLOBE_CONFIG.autoRotateSpeed;
    
    // Apply user interaction rotation
    this.globeGroup.rotation.y += this.rotationVelocity.y;
    this.globeGroup.rotation.x += this.rotationVelocity.x;
    
    // Apply hover influence
    this.globeGroup.rotation.y += this.targetRotation.y;
    this.globeGroup.rotation.x += this.targetRotation.x;
    
    // Decay velocity (momentum)
    this.rotationVelocity.x *= GLOBE_CONFIG.dampingFactor;
    this.rotationVelocity.y *= GLOBE_CONFIG.dampingFactor;
    
    // Decay hover influence
    this.targetRotation.x *= 0.95;
    this.targetRotation.y *= 0.95;
    
    this.renderer.render(this.scene, this.camera);
  }
}

// ==========================================================================
// Initialization
// ==========================================================================

/**
 * Initialize globe when DOM is ready
 */
function initGlobe() {
  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('globe.js: Three.js is not loaded');
    return;
  }
  
  new DottedGlobe('globe-container');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobe);
} else {
  initGlobe();
}
