"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

 function SignUp  () {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`/api/signup`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Response:', data);
  //       const res = await signIn('credentials', {
  //         redirect: false,
  //         email,
  //         password,
  //       });
  //       // router.replace(`${process.env.EXTAUTH_URL}`)
  //       router.replace(`http://localhost:3000`)
    
  //       if (res?.error) {
  //         setError('Invalid email or password');
  //       } else {
  //         if (res?.url) router.replace(`/`);
  //         setError('');
  //       }
  //     } else {
  //       console.error('Error:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <div className="mt-24 w-[90vw] rounded-[7%] border-4 border-violet-500 max-w-md mx-auto bg-violet-950  text-white p-8 shadow-lg rounded-lg ">
      <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
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
            Sign Up
          </button>
        </div>
      </form>
      <div className='w-full  flex justify-center'>
        <h2 className='text-red-800 text-2xl font-bold'>
          {error}
        </h2>
      </div>
      <div className="text-center text-white-300">
        <p className="mb-4">Already have an account?</p>
        <Link href="/login" className=" bg-violet-400 rounded p-2 m-4 text-black hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
