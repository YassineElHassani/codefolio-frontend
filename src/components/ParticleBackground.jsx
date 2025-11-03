import { useCallback, useMemo } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const ParticleBackground = () => {
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: '#000000',
        },
      },
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      detectRetina: true,
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          repulse: {
            distance: 120,
          },
        },
      },
      particles: {
        color: {
          value: ['#4A70A9', '#8FABD4', '#EFECE3'],
        },
        links: {
          color: '#4A70A9',
          enable: true,
          opacity: 0.25,
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 1.1 },
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60,
        },
        opacity: {
          value: { min: 0.2, max: 0.5 },
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
    }),
    [],
  )

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])

  return (
    <div className="absolute inset-0">
      <Particles id="codefolio-particles" init={particlesInit} options={options} />
    </div>
  )
}

export default ParticleBackground
