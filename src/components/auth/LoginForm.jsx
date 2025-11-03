import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { LOGIN } from '../../graphql/mutations'

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: data => {
      const token = data?.login?.token
      if (token) {
        window.localStorage.setItem('token', token)
        setErrorMessage('')
        onSuccess?.()
      }
    },
    onError: error => {
      setErrorMessage(error.message ?? 'Login failed')
    },
  })

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(previous => ({ ...previous, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    login({ variables: { username: formData.username, password: formData.password } })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-sand/70" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-night/60 px-4 py-3 text-sand outline-none focus:border-ocean"
          autoComplete="username"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-sand/70" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-night/60 px-4 py-3 text-sand outline-none focus:border-ocean"
          autoComplete="current-password"
          required
        />
      </div>
      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-ocean py-3 text-sm font-semibold uppercase tracking-wide text-sand shadow-lg shadow-ocean/40 transition hover:bg-ocean/90 disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

export default LoginForm
