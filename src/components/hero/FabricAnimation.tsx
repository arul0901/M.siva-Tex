import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TransitionDirection } from './HeroTypes';

interface FabricAnimationProps {
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
  currentSlide?: number;
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

  // Harmonic traveling Gerstner cloth equations simulating wind & tension
  float getClothElevation(vec2 pos, float time) {
    float w1 = sin(pos.x * 2.4 - time * 3.8 + pos.y * 1.1) * 0.65;
    float w2 = cos(pos.y * 3.6 - time * 3.2 + pos.x * 1.4) * 0.38;
    float edgeFactor = smoothstep(0.0, 0.8, abs(pos.x));
    float w3 = sin(pos.x * 8.0 + pos.y * 6.0 - time * 5.5) * 0.18 * edgeFactor;
    float w4 = sin(pos.x * 1.2 - time * 2.0) * 0.85;
    return w1 + w2 + w3 + w4;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Directional sweep across the screen: -9.5 to +9.5 units
    float sweepOffset = (uDirection > 0.0)
      ? mix(-9.5, 9.5, uProgress)
      : mix(9.5, -9.5, uProgress);
    pos.x += sweepOffset;

    float elevation = getClothElevation(vec2(pos.x * 0.45, pos.y * 0.45), uTime);
    
    // 3D Ballooning arch toward camera as fabric billows in the wind
    float arch = sin(clamp(uProgress, 0.0, 1.0) * 3.14159) * 2.4;
    pos.z += elevation * (0.9 + arch * 0.4) + arch * 0.8;
    pos.y -= abs(sin(pos.x * 0.65 - uTime * 1.8)) * 0.4 * (1.0 - uv.y);

    // Dynamic normal calculation for physically accurate lighting
    float delta = 0.04;
    float eRight = getClothElevation(vec2((pos.x + delta) * 0.45, pos.y * 0.45), uTime);
    float eUp    = getClothElevation(vec2(pos.x * 0.45, (pos.y + delta) * 0.45), uTime);
    
    vec3 tangentX = normalize(vec3(delta, 0.0, (eRight - elevation) * 1.5));
    vec3 tangentY = normalize(vec3(0.0, delta, (eUp - elevation) * 1.5));
    vec3 calculatedNormal = normalize(cross(tangentX, tangentY));

    vNormal = normalize(normalMatrix * calculatedNormal);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vElevation = pos.z;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 uColorBase;
  uniform vec3 uColorMid;
  uniform vec3 uColorZari;
  uniform float uOpacity;
  uniform float uProgress;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vElevation;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Warm high-fashion studio key light
    vec3 lightDir1 = normalize(vec3(0.65, 0.85, 1.3));
    // Soft ambient bounce fill light
    vec3 lightDir2 = normalize(vec3(-0.7, -0.4, 0.6));

    float diff1 = max(0.0, dot(normal, lightDir1));
    float diff2 = max(0.0, dot(normal, lightDir2)) * 0.4;

    // Authentic silk anisotropic & Fresnel sheen
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.6);

    // Specular zari reflection
    vec3 halfDir = normalize(lightDir1 + viewDir);
    float spec = pow(max(0.0, dot(normal, halfDir)), 36.0) * 1.8;

    // Dual-tone silk blending: deep maroon/velvet in troughs, brilliant gold in peaks
    float foldFactor = smoothstep(-1.0, 1.8, vElevation);
    vec3 silkColor = mix(uColorBase, uColorMid, foldFactor * 0.72 + diff1 * 0.28);
    
    vec3 finalColor = silkColor + uColorZari * (spec + fresnel * 0.9);

    // Zari woven border detail on edges
    float borderDist = min(vUv.y, 1.0 - vUv.y);
    if (borderDist < 0.09) {
      float zariStripe = sin(vUv.x * 160.0) * 0.5 + 0.5;
      finalColor += uColorZari * zariStripe * 0.6;
    }

    // Depth shading in deep cloth folds
    finalColor *= (0.65 + 0.35 * smoothstep(-1.2, 0.5, vElevation));

    // Dynamic alpha envelope
    float alphaEnvelope = smoothstep(0.0, 0.1, uProgress) * (1.0 - smoothstep(0.85, 1.0, uProgress));
    gl_FragColor = vec4(finalColor, uOpacity * alphaEnvelope);
  }
`;

export const FabricAnimation: React.FC<FabricAnimationProps> = ({
  isTransitioning,
  transitionDirection,
  currentSlide = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Three.js scene once on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Subdivided 3D cloth plane (120x80 vertices)
    const geometry = new THREE.PlaneGeometry(14, 8.5, 120, 80);

    const palette = SILK_PALETTES[currentSlide % SILK_PALETTES.length];
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uDirection: { value: 1.0 },
        uColorBase: { value: new THREE.Color(palette.base) },
        uColorMid: { value: new THREE.Color(palette.mid) },
        uColorZari: { value: new THREE.Color(palette.zari) },
        uOpacity: { value: 0.98 }
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

  // Update cloth color palette when slide changes
  useEffect(() => {
    if (!materialRef.current) return;
    const palette = SILK_PALETTES[currentSlide % SILK_PALETTES.length];
    materialRef.current.uniforms.uColorBase.value.set(palette.base);
    materialRef.current.uniforms.uColorMid.value.set(palette.mid);
    materialRef.current.uniforms.uColorZari.value.set(palette.zari);
  }, [currentSlide]);

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
