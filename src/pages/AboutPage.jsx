import AboutSection from '../components/sections/AboutSection'
import { usePortfolio } from '../hooks/usePortfolio'

const AboutPage = () => {
  const { data, loading, error } = usePortfolio()

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center text-sand/70">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sand/70">
        Failed to fetch about content.
      </div>
    )
  }

  return (
    <div className="py-24">
      <AboutSection
        profile={data?.profile}
        skills={data?.skills}
        experiences={data?.experiences}
      />
    </div>
  )
}

export default AboutPage
