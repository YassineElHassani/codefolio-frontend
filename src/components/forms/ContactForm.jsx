import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../common/SectionHeading'
import { useFadeInUp } from '../../hooks/useScrollAnimation'
import { useToast } from '../../providers/ToastProvider'

const initialState = {
  name: '',
  email: '',
  message: '',
}

const ContactForm = () => {
  const [formData, setFormData] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const { addToast } = useToast()
  const sectionRef = useRef(null)
  const formRef = useFadeInUp({ duration: 0.6, stagger: 0.1 })
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(previous => ({ ...previous, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setSubmitted(true)
    addToast('Message sent successfully! We\'ll get back to you soon.', 'success')
    setTimeout(() => {
      setFormData(initialState)
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="mx-auto w-full max-w-4xl px-6 py-24">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-10 shadow-glass backdrop-blur"
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        ref={formRef}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,112,169,0.25)_0%,rgba(0,0,0,0)_75%)]" />
        <div className="relative">
          <SectionHeading
            eyebrow="Contact"
            title="Let&apos;s collaborate"
            description="Share your vision and let&apos;s craft a memorable experience together. I typically reply within 24 hours."
          />
        </div>
        <form className="relative mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.label
              data-animate
              className="flex flex-col gap-2 text-sm font-medium text-sand/70"
              whileHover={{ scale: 1.02 }}
            >
              Name
              <motion.input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-night/60 px-4 py-3 text-sand outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/40"
                whileFocus={{ borderColor: 'rgba(74, 112, 169, 0.5)' }}
                required
              />
            </motion.label>
            <motion.label
              data-animate
              className="flex flex-col gap-2 text-sm font-medium text-sand/70"
              whileHover={{ scale: 1.02 }}
            >
              Email
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-night/60 px-4 py-3 text-sand outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/40"
                whileFocus={{ borderColor: 'rgba(74, 112, 169, 0.5)' }}
                required
              />
            </motion.label>
          </div>
          <motion.label
            data-animate
            className="flex flex-col gap-2 text-sm font-medium text-sand/70"
            whileHover={{ scale: 1.02 }}
          >
            Message
            <motion.textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-night/60 px-4 py-3 text-sand outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/40"
              whileFocus={{ borderColor: 'rgba(74, 112, 169, 0.5)' }}
              required
            />
          </motion.label>
          <motion.button
            data-animate
            type="submit"
            className="w-full rounded-full bg-ocean py-3 text-sm font-semibold uppercase tracking-wide text-sand shadow-lg shadow-ocean/40 transition hover:bg-ocean/90"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(74, 112, 169, 0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            Send message
          </motion.button>
        </form>
        {submitted && (
          <motion.div
            className="mt-6 rounded-2xl border border-ocean/40 bg-ocean/20 px-4 py-3 text-sm text-ocean"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
          >
            ✓ Message sent! I&apos;ll get back to you shortly.
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default ContactForm
