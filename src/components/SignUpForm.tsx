'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaGoogle } from 'react-icons/fa'
import { BiUser, BiEnvelope, BiLockAlt, BiShow, BiHide } from 'react-icons/bi'

export default function SignUpForm({
  isSignIn,
  loading,
  setLoading,
  toggleForm,
  setError,
}: {
  isSignIn: boolean
  loading: boolean
  setLoading: (v: boolean) => void
  toggleForm: () => void
  setError: (s: string) => void
}) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Sign up failed')
        return
      }
      localStorage.setItem('authToken', data.token || '')
      localStorage.setItem('userId', data.userId || '')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`form-container ${!isSignIn ? 'scale-100' : 'scale-0 fixed pointer-events-none'}`}>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h2 className="form-title">Sign up</h2>

        <div className="google-icon-wrapper">
          <div className={`social-icon google-icon`}>
            <FaGoogle size={22} />
          </div>
        </div>

        <p className="form-label">or use your email for registration</p>

        <div className="input-group">
          <BiUser className="input-icon" />
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="input-group">
          <BiEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="input-group">
          <BiLockAlt className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="eye-toggle-btn"
          >
            {showPassword ? <BiShow /> : <BiHide/>}
          </button>
        </div>

        <div className="input-group">
          <BiLockAlt className="input-icon" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="eye-toggle-btn"
          >
            {showConfirmPassword ? <BiShow /> : <BiHide/>}
          </button>
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          Sign up
        </button>

        <p className="form-toggle-text">
          <span>Already have an account? </span>
          <b onClick={toggleForm} className="form-toggle-link">
            Sign in here
          </b>
        </p>
      </form>
    </div>
  )
}
