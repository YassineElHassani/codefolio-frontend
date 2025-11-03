import ProjectsSection from '../components/sections/ProjectsSection'
import { usePortfolio } from '../hooks/usePortfolio'

const ProjectsPage = () => {
  const { data, loading, error } = usePortfolio()

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center text-sand/70">Loading projects...</div>
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sand/70">
        Failed to fetch projects.
      </div>
    )
  }

  return (
    <div className="py-24">
      <ProjectsSection projects={data?.projects} />
    </div>
  )
}

export default ProjectsPage
