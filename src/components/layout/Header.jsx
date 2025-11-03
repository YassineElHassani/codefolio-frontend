import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../../providers/ThemeProvider'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

const activeClasses = 'text-ocean'
const baseLinkClasses =
  'px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-ocean'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full border border-white/10 bg-white/10 text-sand shadow-glass backdrop-blur"
      aria-label="Toggle color mode"
    >
      <span className="absolute inset-0 flex items-center justify-center text-lg">
        {theme === 'dark' ? '☾' : '☀'}
      </span>
    </button>
  )
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur">
  <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-semibold text-sand">
          CodeFolio
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${baseLinkClasses} ${isActive ? activeClasses : 'text-sand/80'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/my-panel"
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? activeClasses : 'text-sand/80'}`
            }
          >
            Dashboard
          </NavLink>
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sand md:hidden"
          onClick={() => setIsOpen(current => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {isOpen && (
        <div id="mobile-nav" className="border-t border-white/10 bg-night/90 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-2 px-6 py-4 text-sand">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${baseLinkClasses} w-full rounded-md ${isActive ? 'bg-ocean/10 text-ocean' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/my-panel"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${baseLinkClasses} w-full rounded-md ${isActive ? 'bg-ocean/10 text-ocean' : ''}`
              }
            >
              Dashboard
            </NavLink>
            <ThemeToggle />
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
