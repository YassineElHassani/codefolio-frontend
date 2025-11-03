import { useRef, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BackgroundOrbs from '../components/decor/BackgroundOrbs'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useSmoothScroll } from '../hooks/useScrollUtils'

gsap.registerPlugin(ScrollTrigger)

const AppLayout = () => {
  const progressRef = useRef(null)

  // Enable smooth scroll
  useSmoothScroll()

  // Setup scroll progress
  useEffect(() => {
    const progressBar = progressRef.current
    if (!progressBar) return

    gsap.to(progressBar, {
      scaleX: 1,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        markers: false,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-dark text-sand">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-ocean/10 z-50 pointer-events-none">
        <div
          ref={progressRef}
          className="h-full bg-gradient-progress shadow-lg shadow-ocean/50 origin-left"
          style={{ scaleX: 0 }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-overlay" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22 viewBox=%220 0 4 4%22%3E%3Cpath fill=%22%23ffffff12%22 d=%22M0 0h1v1H0zM2 2h1v1H2z%22/%3E%3C/svg%3E')] opacity-50" />
      <BackgroundOrbs />
      <Header />
      <main className="relative z-10 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
