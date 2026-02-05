'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle} from 'react-icons/fa';
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';

interface SignInFormProps {
  isSignIn: boolean;
  setLoading: (loading: boolean) => void;
  toggleForm: () => void;
  setError: (error: string) => void;
}

const inputGroupStyle = "relative w-full my-4";
const iconStyle = "absolute top-1/2 left-4 -translate-y-1/2 text-[1.4rem] text-[#757575]";
const inputStyle = "w-full p-[1rem_3rem] text-[1rem] bg-[#efefef] rounded-[.5rem] border-[0.125rem] border-white outline-none focus:border-[#4EA685] transition-colors duration-300";
const btnStyle = "w-full cursor-pointer p-[.6rem_0] rounded-[.5rem] border-none bg-[#4EA685] text-white text-[1.2rem] font-semibold hover:opacity-90 transition-opacity disabled:opacity-70";
const socialIconStyle = "flex items-center justify-center p-[.7rem] mx-[.5rem] rounded-[.5rem] cursor-pointer text-white hover:scale-110 transition-transform duration-400";

type SignInData = {
  email: string;
  password: string;
};

export default function SignInForm({ isSignIn, setLoading, toggleForm, setError }: SignInFormProps) {
  const router = useRouter();
  const [signInData, setSignInData] = useState<SignInData>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof SignInData;
    setSignInData(prev => ({ ...prev, [key]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.uid);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Sign in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-[28rem] transition-all duration-500 delay-1000 ease-in-out origin-center transform ${isSignIn ? 'scale-100' : 'scale-0 fixed pointer-events-none'}`}>
      <form onSubmit={handleSignIn} className="bg-white p-[1rem] rounded-[1.5rem] w-full text-center">
        <h2 className="text-[2rem] font-bold mb-4">Sign in</h2>
        
        <div className="flex justify-center my-[2rem]">
          <div className={`${socialIconStyle} bg-[#DB4437]`}><FaGoogle size={22} /></div>
        </div>

        <p className="text-[.7rem] my-4">or use your account</p>

        <div className={inputGroupStyle}>
          <BiEnvelope className={iconStyle} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signInData.email}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div className={inputGroupStyle}>
          <BiLockAlt className={iconStyle} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInData.password}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <p className="my-2 text-right text-[.7rem]">
          <b className="cursor-pointer font-semibold text-[#757575] hover:text-[#4EA685]">
              Forgot password?
          </b>
        </p>

        <button onClick={handleSignIn} type="submit" className={btnStyle}>
          Sign in
        </button>
        <p className="mt-4 text-[.8rem]">
          <span>Don't have an account? </span>
          <b onClick={toggleForm} className="pl-3 cursor-pointer font-semibold text-[#4EA685] hover:opacity-80">
            Sign up here
          </b>
        </p>
      </form>
    </div>
  );
}