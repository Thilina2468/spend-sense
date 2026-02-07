'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaGoogle } from 'react-icons/fa'
import { BiEnvelope, BiLockAlt, BiShow, BiHide } from 'react-icons/bi'

export default function SignInForm({ isSignIn, loading, setLoading, toggleForm, setError }: {
  isSignIn: boolean
  loading: boolean
  setLoading: (v: boolean) => void
  toggleForm: () => void
  setError: (s: string) => void
}) {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Sign in failed')
        return
      }
      localStorage.setItem('authToken', data.token || '')
      localStorage.setItem('userId', data.uid || '')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Sign in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`form-container ${isSignIn ? 'scale-100' : 'scale-0 fixed pointer-events-none'}`}>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h2 className="form-title">Sign in</h2>

        <div className="google-icon-wrapper">
          <div className={`social-icon google-icon`}>
            <FaGoogle size={22} />
          </div>
        </div>

        <p className="form-label">or use your account</p>

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

        <p className="form-forgot-password">
          <b className="form-forgot-link">Forgot password?</b>
        </p>

        <button type="submit" className="form-button" disabled={loading}>
          Sign in
        </button>

        <p className="form-toggle-text">
          <span>Don't have an account? </span>
          <b onClick={toggleForm} className="form-toggle-link">
            Sign up here
          </b>
        </p>
      </form>
    </div>
  )
}
