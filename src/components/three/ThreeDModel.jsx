import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial, shaderMaterial } from '@react-three/drei'
import { Color, Vector2 } from 'three'
import { motion } from 'framer-motion'

const ScanMaterial = shaderMaterial(
  {
    uTime: 0,
    uBaseColor: new Color('#4A70A9'),
    uHighlightColor: new Color('#EFECE3'),
    uDepthColor: new Color('#000000'),
    uScanSpeed: 0.6,
    uResolution: new Vector2(1, 1),
  },
  /* glsl */ `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 transformed = position;
      float wave = sin((uv.x + uv.y + uv.x * uv.y) * 6.0 + uTime * 0.8) * 0.15;
      transformed.z += wave;
      vElevation = transformed.z;
      vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* glsl */ `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uHighlightColor;
    uniform vec3 uDepthColor;
    uniform float uScanSpeed;
    uniform vec2 uResolution;

    void main() {
      float depth = clamp(vElevation * 2.5 + 0.5, 0.0, 1.0);
      vec3 base = mix(uDepthColor, uBaseColor, depth);

      float scanY = mod(uTime * uScanSpeed, 2.0);
      float scanBand = smoothstep(scanY - 0.02, scanY, vUv.y) * (1.0 - smoothstep(scanY, scanY + 0.02, vUv.y));
      vec3 scanColor = uHighlightColor * scanBand * 1.8;

      float radial = smoothstep(0.0, 0.6, distance(vUv, vec2(0.5))) * 0.4;
      vec3 color = base + scanColor - radial;

      gl_FragColor = vec4(color, 0.8);
    }
  `,
)
extend({ ScanMaterial })

const resolutionVector = new Vector2()

const DepthPlane = () => {
  const materialRef = useRef()

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return
    materialRef.current.uTime = clock.getElapsedTime()
    resolutionVector.set(size.width, size.height)
    materialRef.current.uResolution = resolutionVector
  })

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, 0]}>
      <planeGeometry args={[6, 6, 256, 256]} />
  <scanMaterial ref={materialRef} transparent depthWrite={false} />
    </mesh>
  )
}

const FloatingCrystal = () => {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.25
    meshRef.current.rotation.y = t * 0.3
  })

  return (
    <Float floatIntensity={1.2} speed={1.2} rotationIntensity={0.6}>
      <mesh ref={meshRef} scale={1.2}>
        <dodecahedronGeometry args={[0.9, 1]} />
        <MeshTransmissionMaterial
          anisotropy={0.4}
          chromaticAberration={0.02}
          distortionScale={0.2}
          temporalDistortion={0.1}
          thickness={0.6}
          ior={1.25}
          color="#8FABD4"
        />
      </mesh>
    </Float>
  )
}

const SceneContents = () => {
  return (
    <>
      <color attach="background" args={[0x000000]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[2.5, 3.5, 4]}
        intensity={1.1}
        color="#EFECE3"
        castShadow
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#4A70A9" />
      <spotLight
        position={[0, 4, 2]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.4}
        color="#8FABD4"
      />
      <FloatingCrystal />
      <DepthPlane />
      <Environment preset="night" />
    </>
  )
}

const ThreeDModel = () => {
  const containerRef = useRef(null)

  const canvasProps = useMemo(() => ({
    camera: { position: [0, 1.2, 4.5], fov: 40 },
    dpr: [1, 1.75],
    frameloop: 'always',
  }), [])

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glass backdrop-blur"
    >
      <Suspense
        fallback={<div className="flex h-full items-center justify-center text-sand/60">Loading scene...</div>}
      >
        <Canvas {...canvasProps}>
          <SceneContents />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0" style={{backgroundImage: 'radial-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, transparent 100%)'}} />
    </motion.div>
  )
}

export default ThreeDModel
