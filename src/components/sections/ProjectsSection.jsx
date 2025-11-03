import { useMemo, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../common';
import { useFadeInUp, useScaleIn } from '../../hooks/useScrollAnimation';

const filters = ['All', 'Web', 'Mobile', 'UI/UX', 'Tools'];

const ProjectCard = ({ project, index }) => {
  const cardRef = useScaleIn({
    duration: 0.6,
    delay: index * 0.1,
    fromScale: 0.9,
  });

  return (
    <motion.article
      ref={cardRef}
      className="group relative overflow-hidden rounded-4xl border border-white/10 bg-night/60 p-6 text-sand shadow-glass backdrop-blur"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 140, damping: 20 }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(74,112,169,0.28)_0%,rgba(0,0,0,0)_70%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      {project.image ? (
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-48 w-full rounded-3xl object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-dashed border-sand/20 text-sand/40">
          Preview coming soon
        </div>
      )}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ocean/40 bg-night/80 text-ocean/90">
            {project.skills?.[0]?.[0]?.toUpperCase() ?? '✦'}
          </span>
          <h3 className="text-xl font-semibold text-sand">{project.title}</h3>
        </div>
        <p className="text-sm text-sand/70 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {(project.skills ?? []).map((skill, idx) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="rounded-full border border-white/10 bg-night/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sand/60"
            >
              {skill}
            </motion.span>
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ocean transition hover:text-ocean/80"
          >
            Visit project
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </motion.article>
  )
}

const ProjectsSection = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef(null)
  const filtersRef = useFadeInUp({ duration: 0.6, stagger: 0.05 })
  const inView = useInView(sectionRef, { amount: 0.25, once: true })

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects ?? []
    return (projects ?? []).filter(project => project.skills?.includes(activeFilter))
  }, [activeFilter, projects])

  return (
    <section id="projects" ref={sectionRef} className="mx-auto w-full max-w-6xl px-6 py-28">
      <motion.header
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <SectionHeading
          eyebrow="Projects"
          title="Selected work crafted with precision and storytelling"
          description="Interactive experiences that combine human-centered design, delightful motion, and robust engineering."
        />
        <div ref={filtersRef} className="flex flex-wrap justify-end gap-2">
          {filters.map((filter, idx) => (
            <motion.button
              key={filter}
              data-animate
              type="button"
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                activeFilter === filter
                  ? 'border-ocean bg-ocean/20 text-ocean shadow-[0_6px_25px_rgba(74,112,169,0.35)]'
                  : 'border-white/10 bg-night/60 text-sand/50 hover:border-ocean/40 hover:text-sand'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </motion.header>

      <motion.div
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))
        ) : (
          <p className="text-sand/60">Projects coming soon.</p>
        )}
      </motion.div>
    </section>
  )
}

export default ProjectsSection
