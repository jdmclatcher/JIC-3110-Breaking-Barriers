'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

export default function Home() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter()

  const handleLogin = () => {
    router.push('/dashboard', { scroll: false });
  }

  return (
    <main>
      <div>
        <h1>Breaking Barriers Training Application</h1>
        <div>
          <h2>Login</h2>

          <div style={{ marginBottom: '10px' }}>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                ref={usernameRef}
                required
              />
          </div>

          <div style={{ marginBottom: '10px' }}>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                required
              />
          </div>

          <div style={{ marginTop: '20px' }}>
              <button onClick={handleLogin}>Login</button>
          </div>
          <Link href="/create-account">Create Account</Link>
        </div>
      </div>
    </main>
  )
}
