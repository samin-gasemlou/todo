import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, email, password }),
    });
    const data = await res.json();
    if (res.status === 201) {
      alert('User registered successfully!');
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-gradient-to-t from-[#6365f19c] to-[#6365f19c]  bg-[#6365f197]">
      <div className="logo mt-10">
        <img className="object-cover" src="logo.png" alt="logo" />
      </div>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-[80%] mt-14">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your user name"
          className="px-4 py-5 bg-[#ffffff] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#111827]"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your  email"
          className="px-4 py-5 bg-[#ffffff] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#111827]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-5 bg-[#ffffff] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#111827]"
        />
        <button
          type="submit"
          className="px-28 py-6 bg-[#ffffff] text-[#0EA5E9] font-inter font-extrabold text-[17px] rounded-[8px] mb-4"
        >
          Register
        </button>
      </form>
    </div>
  );
}
export default Register;
