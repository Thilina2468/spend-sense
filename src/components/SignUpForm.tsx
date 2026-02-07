'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaGoogle } from 'react-icons/fa'
import { BiUser, BiEnvelope, BiLockAlt, BiShow, BiHide } from 'react-icons/bi'

const inputGroupStyle = 'relative w-full my-4'
const iconStyle = 'absolute top-1/2 left-4 -translate-y-1/2 text-[1.4rem] text-[#757575]'
const inputStyle =
  'w-full p-[1rem_3rem] text-[1rem] bg-[#efefef] rounded-[.5rem] border-[0.125rem] border-white outline-none focus:border-[#4EA685] transition-colors duration-300'
const btnStyle =
  'w-full cursor-pointer p-[.6rem_0] rounded-[.5rem] border-none bg-[#4EA685] text-white text-[1.2rem] font-semibold hover:opacity-90 transition-opacity disabled:opacity-70'
const socialIconStyle =
  'flex items-center justify-center p-[.7rem] mx-[.5rem] rounded-[.5rem] cursor-pointer text-white hover:scale-110 transition-transform duration-400'

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
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Sign up failed')
        return
      }
      localStorage.setItem('authToken', data.token || '')
      localStorage.setItem('userId', data.uid || '')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`w-full max-w-[28rem] transition-all duration-500 delay-1000 ease-in-out origin-center transform ${!isSignIn ? 'scale-100' : 'scale-0 fixed pointer-events-none'}`}>
      <form onSubmit={handleSubmit} className="bg-white p-[1rem] rounded-[1.5rem] w-full text-center">
        <h2 className="text-[2rem] font-bold mb-4">Sign up</h2>

        <div className="flex justify-center my-[2rem]">
          <div className={`${socialIconStyle} bg-[#DB4437] delay-[1.6s]`}>
            <FaGoogle size={22} />
          </div>
        </div>

        <p className="text-[.7rem] my-4">or use your email for registration</p>

        <div className={inputGroupStyle}>
          <BiUser className={iconStyle} />
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <div className={inputGroupStyle}>
          <BiEnvelope className={iconStyle} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <div className={inputGroupStyle}>
          <BiLockAlt className={iconStyle} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={inputStyle}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[1.4rem] text-[#757575] hover:text-[#4EA685] cursor-pointer"
          >
            {showPassword ? <BiShow /> : <BiHide/>}
          </button>
        </div>

        <div className={inputGroupStyle}>
          <BiLockAlt className={iconStyle} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={inputStyle}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[1.4rem] text-[#757575] hover:text-[#4EA685] cursor-pointer"
          >
            {showConfirmPassword ? <BiShow /> : <BiHide/>}
          </button>
        </div>

        <button type="submit" className={btnStyle} disabled={loading}>
          Sign up
        </button>

        <p className="mt-4 text-[.8rem]">
          <span>Already have an account? </span>
          <b onClick={toggleForm} className="pl-3 cursor-pointer font-semibold text-[#4EA685] hover:opacity-80">
            Sign in here
          </b>
        </p>
      </form>
    </div>
  )
}
