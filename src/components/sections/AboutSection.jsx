import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'
import SectionHeading from '../common/SectionHeading'
import { useFadeInUp, useCounterAnimation } from '../../hooks/useScrollAnimation'

const AboutSection = ({ profile, skills, experiences }) => {
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { amount: 0.4, once: true })
  const principlesRef = useFadeInUp({ duration: 0.6, stagger: 0.1 })
  const yearsRef = useCounterAnimation(profile?.yearsOfExperience || 5, { duration: 2, suffix: '+' })
  const projectsRef = useCounterAnimation(profile?.projectsCount || 24, { duration: 2, suffix: '+' })
  const skillsRef = useFadeInUp({ duration: 0.6, stagger: 0.05 })
  const experienceRef = useFadeInUp({ duration: 0.6, stagger: 0.08 })

  const sortedExperiences = useMemo(() => {
    if (!experiences) return []
    return [...experiences].sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
  }, [experiences])

  return (
    <section id="about" ref={containerRef} className="mx-auto w-full max-w-6xl px-6 py-28">
      <div className="mb-16 flex justify-between gap-10 max-md:flex-col">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <SectionHeading
            eyebrow="About"
            title="Crafting immersive digital narratives"
            description={
              profile?.bio ??
              'I design and build modern, performant interfaces that blend storytelling, interaction, and reliability.'
            }
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-sand/70 shadow-glass backdrop-blur"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,236,227,0.22)_0%,rgba(0,0,0,0)_70%)] opacity-70" />
          <div className="relative space-y-3">
            <p>
              I believe in designing journeys that feel alive. My approach balances art direction with reliable,
              maintainable engineering to deliver interactive experiences that stay memorable.
            </p>
            <p className="text-sand/60">
              Collaboration, motion, and micro-interactions are the backbone of my process—from early prototypes to
              production-ready builds.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-8 shadow-glass backdrop-blur-lg"
          ref={principlesRef}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,112,169,0.2)_0%,rgba(0,0,0,0)_70%)] opacity-70" />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sand">Principles</h3>
              <ul className="grid gap-4 text-sand/80 md:grid-cols-2">
                <li data-animate className="rounded-2xl border border-white/10 bg-night/40 p-4">
                  Designing with clarity and purpose so every interaction feels obvious yet delightful.
                </li>
                <li data-animate className="rounded-2xl border border-white/10 bg-night/40 p-4">
                  Building resilient systems with modular architecture and progressive enhancement in mind.
                </li>
                <li data-animate className="rounded-2xl border border-white/10 bg-night/40 p-4">
                  Embedding motion and storytelling that respond to context, making experiences memorable.
                </li>
                <li data-animate className="rounded-2xl border border-white/10 bg-night/40 p-4">
                  Iterating with data and feedback loops to continuously elevate product quality.
                </li>
              </ul>
            </div>
            <div className="grid gap-6 rounded-2xl border border-white/10 bg-night/30 p-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sand/50">Years crafting</p>
                <p ref={yearsRef} className="mt-2 text-4xl font-bold text-sand">0+</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sand/50">Projects launched</p>
                <p ref={projectsRef} className="mt-2 text-4xl font-bold text-sand">0+</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="space-y-8"
          ref={skillsRef}
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-sand">Skills</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-sand/50">Toolkit</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {(skills ?? []).map(skill => (
                <span
                  key={skill.id}
                  data-animate
                  className="rounded-full border border-white/10 bg-night/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sand/70 shadow-[0_0_20px_rgba(74,112,169,0.2)]"
                >
                  {skill.name}
                </span>
              ))}
              {!skills?.length ? <p className="text-sm text-sand/60">Skills coming soon.</p> : null}
            </div>
          </div>
          <div ref={experienceRef} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-sand">Experience</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-sand/50">Timeline</span>
            </div>
            <ul className="mt-6 space-y-6 text-sm text-sand/70">
              {(sortedExperiences.length ? sortedExperiences : experiences ?? []).map(experience => (
                <li key={experience.id} data-animate className="relative pl-6">
                  <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-ocean/60 bg-night/80" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold text-sand">{experience.role}</p>
                      <p className="text-xs uppercase tracking-widest text-sand/50">
                        {experience.startDate} – {experience.endDate ?? 'Present'}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-sand/50">{experience.company}</p>
                    <p className="leading-relaxed text-sand/70">{experience.details}</p>
                  </div>
                </li>
              ))}
              {!sortedExperiences.length && !experiences?.length ? (
                <li className="text-sm text-sand/60">Experience details will be published soon.</li>
              ) : null}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
