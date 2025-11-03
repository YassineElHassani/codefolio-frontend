import Hero from '../components/sections/Hero'
import AboutSection from '../components/sections/AboutSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ContactForm from '../components/forms/ContactForm'
import { usePortfolio } from '../hooks/usePortfolio'

const HomePage = () => {
	const { data, loading, error } = usePortfolio()

	if (loading) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center text-sand/70">Loading portfolio...</div>
		)
	}

	if (error) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center text-sand/70">
				Failed to load portfolio. Please try again later.
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<Hero profile={data?.profile} />
			<AboutSection profile={data?.profile} skills={data?.skills} experiences={data?.experiences} />
			<ProjectsSection projects={data?.projects} />
			<ContactForm />
		</div>
	)
}

export default HomePage
