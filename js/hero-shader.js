/**
 * hero-shader.js
 * ==========================================================================
 * Three.js/WebGL Background Animation for Zovatek Website
 * 
 * Purpose: Creates and manages the animated mesh gradient background
 * displayed in the hero section using Three.js and custom GLSL shaders.
 * 
 * Features:
 * - Simplex noise-based fluid motion
 * - Film grain overlay effect
 * - Responsive canvas that adapts to window resizing
 * - Performance-optimized rendering
 * 
 * Dependencies:
 * - Three.js (loaded via CDN in HTML)
 * ==========================================================================
 */

// ==========================================================================
// GLSL Shader Code
// ==========================================================================

/**
 * Simplex Noise 3D Function (GLSL)
 * Used for organic, smooth random motion in the gradient
 */
const simplexNoise3D = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/**
 * Vertex Shader
 * Simple pass-through shader that sets up UV coordinates
 */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Fragment Shader
 * Creates the mesh gradient effect with:
 * - Animated blob-based color mixing
 * - Film grain overlay
 * - Left-side white mask for text readability
 */
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  ${simplexNoise3D}

  // Random function for film grain
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float blob(vec2 uv, vec2 center, float radius) {
    float d = distance(uv, center);
    return smoothstep(radius, 0.0, d);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.2;

    // Subtle drift for mesh points (glsl-noise style motion)
    vec2 drift1 = vec2(snoise(vec3(uv * 1.2, t)), snoise(vec3(uv * 1.5 + 10.0, t))) * 0.03;
    vec2 drift2 = vec2(snoise(vec3(uv * 1.1 + 20.0, t)), snoise(vec3(uv * 1.6 + 30.0, t))) * 0.03;
    vec2 drift3 = vec2(snoise(vec3(uv * 1.3 + 40.0, t)), snoise(vec3(uv * 1.4 + 50.0, t))) * 0.03;
    vec2 drift4 = vec2(snoise(vec3(uv * 1.2 + 60.0, t)), snoise(vec3(uv * 1.7 + 70.0, t))) * 0.03;

    // Moving mesh nodes (biased to the right to keep left side white)
    vec2 p1 = vec2(0.25, 0.25) + drift1 * 0.5;
    vec2 p2 = vec2(0.75, 0.35) + drift2;
    vec2 p3 = vec2(0.70, 0.75) + drift3;
    vec2 p4 = vec2(0.45, 0.65) + drift4 * 0.6;

    float b1 = blob(uv, p1, 0.7);
    float b2 = blob(uv, p2, 0.65);
    float b3 = blob(uv, p3, 0.7);
    float b4 = blob(uv, p4, 0.6);

    // Normalize blend weights
    float sum = b1 + b2 + b3 + b4 + 0.0001;
    b1 /= sum; b2 /= sum; b3 /= sum; b4 /= sum;

    // Palette (White Mode tech aesthetic)
    vec3 c1 = vec3(1.0, 1.0, 1.0);                // #FFFFFF
    vec3 c2 = vec3(0.0, 0.71, 0.886);             // #00B5E2
    vec3 c3 = vec3(0.886, 0.91, 0.941);           // #E2E8F0
    vec3 c4 = vec3(0.941, 0.976, 1.0);            // #F0F9FF

    // High mix value to keep colors clean and not muddy
    vec3 meshColor = (c1 * b1 + c2 * b2 + c3 * b3 + c4 * b4);
    meshColor = mix(vec3(1.0), meshColor, 0.35);

    // Force left side to stay near-white for text readability
    float leftMask = smoothstep(0.0, 0.45, uv.x);
    vec3 finalColor = mix(vec3(1.0), meshColor, leftMask);

    // Ensure overall brightness stays high (95%+ white)
    finalColor = mix(vec3(1.0), finalColor, 0.6);

    // Film grain overlay (noticeable)
    vec2 grainUv = vUv * uResolution / 2.0;
    float grain = random(grainUv + t) * 2.0 - 1.0;
    finalColor += grain * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ==========================================================================
// Three.js Scene Initialization
// ==========================================================================

/**
 * Initialize the liquid gradient background
 * Creates a full-screen shader mesh with animated gradient effect
 */
function initLiquidGradient() {
  const container = document.getElementById('hero-background');
  
  // Exit if container doesn't exist
  if (!container) {
    console.warn('hero-shader.js: #hero-background container not found');
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  
  // Renderer setup with performance optimizations
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Shader uniforms
  const uniforms = {
    uTime: { value: 0.0 },
    uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
  };

  // Create shader material
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  // Create full-screen plane geometry
  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    uniforms.uTime.value += 0.016; // ~60fps delta time
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    renderer.setSize(width, height);
    uniforms.uResolution.value.set(width, height);
  });
}

// ==========================================================================
// Initialization
// ==========================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLiquidGradient);
} else {
  initLiquidGradient();
}
