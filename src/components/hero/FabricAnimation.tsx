import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { HERO_SLIDES, TransitionDirection } from './HeroTypes';

interface FabricAnimationProps {
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
  currentSlide?: number;
  prevSlide?: number | null;
}

// Signature Silk Color Palettes for each Collection Scene
const SILK_PALETTES = [
  {
    base: '#4D0007', // Imperial Crimson
    mid: '#D4AF37',  // 24K Gold Zari
    zari: '#FFF5D8'  // Specular Gold Thread
  },
  {
    base: '#800020', // Burgundy Velvet
    mid: '#E6A117',  // Turmeric Gold
    zari: '#FFF8E7'
  },
  {
    base: '#B18A52', // Antique Gold
    mid: '#FFDF73',  // Radiant Mulberry Gold
    zari: '#FFFFFF'
  },
  {
    base: '#3A002A', // Imperial Banarasi Purple
    mid: '#D4AF37',  // Kadwa Gold Zari
    zari: '#FFF0C8'
  },
  {
    base: '#4D0007', // Royal Heritage Maroon
    mid: '#D4AF37',  // Authentic Korvai Gold
    zari: '#FFF5D8'
  }
];

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uDirection;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vElevation;
  varying float vCrest;
  varying float vPosWorldX;

  // Harmonic traveling Gerstner cloth equations simulating wind & tension
  float getClothElevation(vec2 pos, float time) {
    float w1 = sin(pos.x * 2.2 - time * 3.6 + pos.y * 1.1) * 0.65;
    float w2 = cos(pos.y * 3.4 - time * 3.0 + pos.x * 1.3) * 0.38;
    float w3 = sin(pos.x * 7.5 + pos.y * 5.5 - time * 5.0) * 0.16;
    float w4 = sin(pos.x * 1.1 - time * 1.9) * 0.75;
    return w1 + w2 + w3 + w4;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    vPosWorldX = pos.x;

    // Moving wave front traveling across the cloth in screen space (-8.5 to +8.5)
    float waveFront = (uDirection > 0.0)
      ? mix(-8.5, 8.5, uProgress)
      : mix(8.5, -8.5, uProgress);

    // Distance of this vertex to the traveling wave front
    float distToCrest = pos.x - waveFront;
    // Gaussian crest profile: peak at the front, tapering smoothly
    float crest = exp(-distToCrest * distToCrest * 0.22);
    vCrest = crest;

    float ripple = getClothElevation(vec2(pos.x * 0.45, pos.y * 0.45), uTime);
    
    // 3D Ballooning wave crest arching outward toward camera
    float arch = sin(clamp(uProgress, 0.0, 1.0) * 3.14159);
    pos.z = crest * (2.9 + arch * 0.9) + ripple * (0.65 + arch * 0.35);

    // Natural gravity dip on lower edge
    pos.y -= abs(sin(pos.x * 0.65 - uTime * 1.8)) * 0.32 * (1.0 - uv.y);

    // Dynamic normal calculation for physically accurate lighting
    float delta = 0.04;
    float rRight = getClothElevation(vec2((pos.x + delta) * 0.45, pos.y * 0.45), uTime);
    float rUp    = getClothElevation(vec2(pos.x * 0.45, (pos.y + delta) * 0.45), uTime);
    
    vec3 tangentX = normalize(vec3(delta, 0.0, (rRight - ripple) * 1.5));
    vec3 tangentY = normalize(vec3(0.0, delta, (rUp - ripple) * 1.5));
    vec3 calculatedNormal = normalize(cross(tangentX, tangentY));

    vNormal = normalize(normalMatrix * calculatedNormal);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vElevation = pos.z;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uNextTexture;
  uniform sampler2D uPrevTexture;
  uniform vec3 uColorBase;
  uniform vec3 uColorMid;
  uniform vec3 uColorZari;
  uniform float uOpacity;
  uniform float uProgress;
  uniform float uDirection;
  uniform float uIsMobile;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vElevation;
  varying float vCrest;
  varying float vPosWorldX;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Warm high-fashion studio key light
    vec3 lightDir1 = normalize(vec3(0.65, 0.85, 1.3));
    // Soft ambient bounce fill light
    vec3 lightDir2 = normalize(vec3(-0.7, -0.4, 0.6));

    float diff1 = max(0.0, dot(normal, lightDir1));
    float diff2 = max(0.0, dot(normal, lightDir2)) * 0.35;

    // Authentic silk anisotropic & Fresnel sheen
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.6);

    // Specular zari reflection
    vec3 halfDir = normalize(lightDir1 + viewDir);
    float spec = pow(max(0.0, dot(normal, halfDir)), 36.0) * 1.8;

    // Aspect-corrected UV for the saree photograph:
    // On desktop:
    // The model is placed on the right portion of the banner (x: 0.42 to 1.0)
    // On mobile: the model is centered across the banner (x: 0.0 to 1.0)
    vec2 sareeUv;
    if (uIsMobile > 0.5) {
      sareeUv = vec2(vUv.x, vUv.y);
    } else {
      float modelStart = 0.42;
      float mappedX = (vUv.x - modelStart) / (1.0 - modelStart);
      sareeUv = vec2(clamp(mappedX, 0.0, 1.0), vUv.y);
    }

    // Sample incoming (next) and outgoing (previous) saree photographs
    vec4 nextSareeTex = texture2D(uNextTexture, sareeUv);
    vec4 prevSareeTex = texture2D(uPrevTexture, sareeUv);

    // Procedural matching silk body for the left drape & fold crevice depth
    float foldFactor = smoothstep(-1.0, 2.2, vElevation);
    vec3 proceduralSilk = mix(uColorBase, uColorMid, foldFactor * 0.75 + diff1 * 0.25);

    // Desktop: blend model photograph on right with matching silk drape on left
    vec3 nextFullColor;
    vec3 prevFullColor;
    if (uIsMobile > 0.5) {
      nextFullColor = nextSareeTex.rgb;
      prevFullColor = prevSareeTex.rgb;
    } else {
      float modelBlend = smoothstep(0.35, 0.48, vUv.x);
      nextFullColor = mix(proceduralSilk, nextSareeTex.rgb, modelBlend);
      prevFullColor = mix(proceduralSilk * 0.85, prevSareeTex.rgb, modelBlend);
    }

    // Traveling wave front position in world X (-8.5 to +8.5)
    float waveFront = (uDirection > 0.0)
      ? mix(-8.5, 8.5, uProgress)
      : mix(8.5, -8.5, uProgress);

    // Smooth transition between previous and next saree at the wave front
    float transitionWipe = (uDirection > 0.0)
      ? smoothstep(waveFront - 2.0, waveFront + 1.2, vPosWorldX)
      : smoothstep(waveFront + 2.0, waveFront - 1.2, vPosWorldX);

    // Base color transitions from previous saree to next saree
    vec3 baseColor = mix(nextFullColor, prevFullColor, transitionWipe);

    // On the 3D wave crest itself, the NEXT saree emerges with intense vibrancy
    vec3 crestSareeColor = mix(baseColor, nextFullColor, clamp(vCrest * 1.4, 0.0, 1.0));

    // Apply 3D physical cloth lighting on top of the saree texture:
    // 1. Studio key light and ambient fill
    vec3 litSaree = crestSareeColor * (0.64 + 0.40 * diff1 + diff2);

    // 2. Specular 24K gold zari glints and silky Fresnel sheen concentrated on wave crest peaks
    litSaree += uColorZari * (spec * (0.65 + vCrest * 0.85) + fresnel * 0.55);

    // 3. Self-shadowing in fold valleys and crevices
    litSaree *= (0.70 + 0.30 * smoothstep(-1.2, 0.8, vElevation));

    // 4. Fine zari woven border along the edges of the saree
    float borderDist = min(vUv.y, 1.0 - vUv.y);
    if (borderDist < 0.08) {
      float zariStripe = sin(vUv.x * 160.0) * 0.5 + 0.5;
      litSaree += uColorZari * zariStripe * 0.45;
    }

    // Alpha envelope: wave sweeps across, peaks in mid-transition, then settles
    float alphaEnvelope = smoothstep(0.0, 0.12, uProgress) * (1.0 - smoothstep(0.86, 1.0, uProgress));
    
    // Mask out the far left on desktop where text sits if not on the wave crest
    float screenMask = (uIsMobile > 0.5) ? 1.0 : smoothstep(0.15, 0.40, vUv.x + vCrest * 0.35);

    gl_FragColor = vec4(litSaree, uOpacity * alphaEnvelope * screenMask);
  }
`;

export const FabricAnimation: React.FC<FabricAnimationProps> = ({
  isTransitioning,
  transitionDirection,
  currentSlide = 0,
  prevSlide = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Preload all high-resolution saree textures on mount
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    texturesRef.current = HERO_SLIDES.map((slide) => {
      const tex = loader.load(slide.image);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    });

    return () => {
      texturesRef.current.forEach((t) => t.dispose());
      texturesRef.current = [];
    };
  }, []);

  // Initialize Three.js scene once on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Subdivided 3D cloth plane covering viewport (120x80 vertices)
    const geometry = new THREE.PlaneGeometry(16, 9.5, 120, 80);

    const palette = SILK_PALETTES[currentSlide % SILK_PALETTES.length];
    const initialTexture = texturesRef.current[currentSlide] || new THREE.Texture();
    const prevTexture = texturesRef.current[prevSlide ?? 0] || initialTexture;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uDirection: { value: 1.0 },
        uNextTexture: { value: initialTexture },
        uPrevTexture: { value: prevTexture },
        uColorBase: { value: new THREE.Color(palette.base) },
        uColorMid: { value: new THREE.Color(palette.mid) },
        uColorZari: { value: new THREE.Color(palette.zari) },
        uOpacity: { value: 0.98 },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    const handleResize = () => {
      if (!renderer || !camera || !container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(w < 768 ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
      if (materialRef.current) {
        materialRef.current.uniforms.uIsMobile.value = w < 768 ? 1.0 : 0.0;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update next and previous saree textures when slide changes
  useEffect(() => {
    if (!materialRef.current || texturesRef.current.length === 0) return;

    const palette = SILK_PALETTES[currentSlide % SILK_PALETTES.length];
    materialRef.current.uniforms.uColorBase.value.set(palette.base);
    materialRef.current.uniforms.uColorMid.value.set(palette.mid);
    materialRef.current.uniforms.uColorZari.value.set(palette.zari);

    const nextTex = texturesRef.current[currentSlide % texturesRef.current.length];
    const prevIdx = prevSlide !== null && prevSlide !== undefined ? prevSlide : 0;
    const prevTex = texturesRef.current[prevIdx % texturesRef.current.length] || nextTex;

    if (nextTex) {
      materialRef.current.uniforms.uNextTexture.value = nextTex;
    }
    if (prevTex) {
      materialRef.current.uniforms.uPrevTexture.value = prevTex;
    }
  }, [currentSlide, prevSlide]);

  // Execute 3D physical cloth animation during transition
  useEffect(() => {
    if (!isTransitioning) {
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = 0;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.clear();
      }
      return;
    }

    const material = materialRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!material || !renderer || !scene || !camera) return;

    material.uniforms.uDirection.value = transitionDirection === 'next' ? 1.0 : -1.0;

    const startTime = performance.now();
    const duration = 1350; // ms

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);

      // Smooth cosine easing for natural slow-motion fabric momentum
      const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);

      material.uniforms.uProgress.value = ease;
      material.uniforms.uTime.value = elapsed * 0.0022;

      renderer.render(scene, camera);

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        material.uniforms.uProgress.value = 0;
        renderer.clear();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isTransitioning, transitionDirection]);

  return (
    <div
      ref={containerRef}
      className={`cinematic-hero-silk-wave-wrapper ${isTransitioning ? 'is-active' : ''}`}
    />
  );
};
