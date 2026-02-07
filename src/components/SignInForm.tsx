'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BiEnvelope, BiLockAlt, BiShow, BiHide } from 'react-icons/bi'

export default function SignInForm({ isSignIn, loading, setLoading, toggleForm, setError }: any) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Save token to localStorage
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('userId', data.userId)

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  if (!isSignIn) {
    return null
  }

  return (
    <div className="form-container scale-100">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h2 className="form-title">Sign In</h2>

        <p className="form-label">Enter your email and password</p>

        <div className="input-group">
          <BiEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="input-group">
          <BiLockAlt className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="eye-toggle-btn"
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </button>
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="form-toggle-text">
          Don't have an account?{' '}
          <b onClick={toggleForm} className="form-toggle-link">
            Sign up
          </b>
        </p>
      </form>
    </div>
  )
}
