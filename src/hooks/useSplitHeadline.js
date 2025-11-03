import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

const ensurePlugins = () => {
  if (isRegistered) return
  if (typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  isRegistered = true
}

export const useSplitHeadline = (ref, { delay = 0.1, stagger = 0.05 } = {}) => {
  useLayoutEffect(() => {
    ensurePlugins()
    const element = ref.current
    if (!element) return undefined

    const original = element.textContent
    const words = original?.split(' ').filter(Boolean) ?? []
    if (!words.length) return undefined

    const fragment = document.createDocumentFragment()
    const innerNodes = []

    words.forEach((word, index) => {
      const outer = document.createElement('span')
      outer.className = 'inline-block overflow-hidden align-bottom'
      const inner = document.createElement('span')
      inner.className = 'inline-block translate-y-full will-change-transform'
      inner.textContent = `${word}${index === words.length - 1 ? '' : ' '}`
      outer.appendChild(inner)
      fragment.appendChild(outer)
      innerNodes.push(inner)
    })

    element.textContent = ''
    element.appendChild(fragment)

    const ctx = gsap.context(() => {
  gsap.set(innerNodes, { yPercent: 100 })
  gsap.to(innerNodes, {
        yPercent: 0,
        ease: 'power3.out',
        duration: 1,
        delay,
        stagger,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          once: true,
        },
      })
    }, element)

    return () => {
      ctx.revert()
      element.textContent = original
    }
  }, [ref, delay, stagger])
}
