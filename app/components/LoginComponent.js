"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const LoginComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/');
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      if (res?.url) router.replace('/dashboard');
      setError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("")
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("")
  };

  return (
    <div className="mt-8 w-[90vw] rounded-[7%] border-4 border-violet-500 max-w-md mx-auto bg-violet-950  text-white p-8 shadow-lg rounded-lg ">
      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm text-white-300">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 w-full border rounded-md bg-violet-900 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm text-white-300">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 w-full border rounded-md bg-violet-900 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-violet-500 text-white p-2 rounded w-full hover:bg-violet-700 focus:outline-none focus:shadow-outline-blue"
          >
            Log In
          </button>
        </div>
      </form>
      <div className='w-full  flex justify-center'>
        <h2 className='text-red-800 text-2xl font-bold'>
          {error}
        </h2>
      </div>
      <div className="text-center text-white-300">
        <p className="mb-4">Don't have an account?</p>
        <Link href="/SignUp" className=" bg-violet-400 rounded p-2 m-4 text-black hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
