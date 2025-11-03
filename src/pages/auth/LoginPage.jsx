import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/my-panel'

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 text-sand shadow-glass backdrop-blur">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sand/70">Sign in to manage your portfolio content.</p>
        <div className="mt-8">
          <LoginForm
            onSuccess={() => {
              navigate(from, { replace: true })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
