'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BiUser, BiEnvelope, BiLockAlt, BiShow, BiHide } from 'react-icons/bi'

export default function SignUpForm({ isSignIn, loading, setLoading, toggleForm, setError }: any) {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Sign up failed')
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

  if (isSignIn) {
    return null
  }

  return (
    <div className="form-container scale-100">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h2 className="form-title">Create Account</h2>

        <p className="form-label">Enter your details to sign up</p>

        <div className="input-group">
          <BiUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </div>

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

        <div className="input-group">
          <BiLockAlt className="input-icon" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="eye-toggle-btn"
          >
            {showConfirmPassword ? <BiShow /> : <BiHide />}
          </button>
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Creating...' : 'Sign Up'}
        </button>

        <p className="form-toggle-text">
          Already have an account?{' '}
          <b onClick={toggleForm} className="form-toggle-link">
            Sign in
          </b>
        </p>
      </form>
    </div>
  )
}
