'use client';

import { useState } from 'react';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError('');
  };

  return (
    <>
      {/* Container */}
      <div className={`relative min-h-screen overflow-hidden bg-white w-full ${isSignIn ? 'sign-in' : 'sign-up'}`}>
        
        {/* Forms Section */}
        <div className="flex flex-wrap h-screen w-full relative z-[5]">
          
          {/* Sign Up Column (Left) */}
          <div className="w-1/2 flex items-center justify-center flex-col relative z-[5]">
             <SignUpForm 
                isSignIn={isSignIn} 
                setLoading={setLoading} 
                toggleForm={toggleForm} 
                setError={setError} 
             />
             {error && !isSignIn && <p className="mt-4 text-sm text-red-600 absolute bottom-10">{error}</p>}
          </div>

          {/* Sign In Column (Right) */}
          <div className="w-1/2 flex items-center justify-center flex-col relative z-[5]">
             <SignInForm 
                isSignIn={isSignIn} 
                setLoading={setLoading} 
                toggleForm={toggleForm} 
                setError={setError} 
             />
             {error && isSignIn && <p className="mt-4 text-sm text-red-600 absolute bottom-10">{error}</p>}
          </div>

        </div>

        {/* Sliding Background */}
        <div 
          className={`absolute top-0 h-full w-[300vw] bg-gradient-to-r from-[#4EA685] to-[#57B894] z-[6] transition-all duration-1000 ease-in-out rounded-l-[max(50vw,50vh)] rounded-r-[max(50vw,50vh)] shadow-[0_5px_15px_rgba(0,0,0,0.35)]
            ${isSignIn ? 'right-[50%] translate-x-0' : 'right-[50%] translate-x-[100%]'}
          `}
        >
        </div>
        
        {/* Texts over Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[6] flex overflow-hidden">
          
          <div className="w-1/2 flex flex-col items-center justify-center text-white p-12 text-center h-full">
            <div className={`transition-transform duration-1000 ease-in-out ${isSignIn ? 'translate-x-[0]' : '-translate-x-[250%]'}`}>
              <h2 className="text-[3.5rem] font-extrabold mb-4">Welcome Back!</h2>
              <p className="font-semibold text-[1rem]">
                To keep connected with us please login with your personal info
              </p>
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center text-white p-12 text-center h-full">
             <div className={`transition-transform duration-1000 ease-in-out ${!isSignIn ? 'translate-x-[0]' : 'translate-x-[250%]'}`}>
              <h2 className="text-[3.5rem] font-extrabold mb-4">Hello, Friend!</h2>
              <p className="font-semibold text-[1rem]">
                Enter your personal details and start journey with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}