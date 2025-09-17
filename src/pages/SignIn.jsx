import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-start bg-gradient-to-t from-[#6365f19c] to-[#6365f19c]  bg-[#6365f197]">
      <div className="logo mt-10">
        <img className="object-cover" src="logo.png" alt="logo" />
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-[80%] mt-14">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your  email"
          className="px-4 py-5 bg-[#ffffff] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#111827]"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="px-4 py-5 bg-[#ffffff] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#111827]"
        />
        <button
          type="submit"
          className="px-28 py-6 bg-[#ffffff] text-[#0EA5E9] font-inter font-extrabold text-[17px] rounded-[8px] mb-4"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
