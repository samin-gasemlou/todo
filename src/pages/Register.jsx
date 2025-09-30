import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('https://todo-back-production-609b.up.railway.app/api/auth/register', {
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
    <div className="w-full h-dvh flex flex-col items-center justify-start bg-[#0B0C10]">
      <div className="logo mt-10">
        <img className="object-cover" src="logo.png" alt="logo" />
      </div>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-[80%] mt-14">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your user name"
          className="px-4 py-5 bg-[#162447] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#ffffff] motion-preset-pop"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your  email"
          className="px-4 py-5 bg-[#162447] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#ffffff] motion-preset-pop"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-5 bg-[#162447] rounded-[8px] border-none outline-1 outline-[#0EA5E9] text-[#ffffff] motion-preset-pop"
        />
        <button
          type="submit"
          className="px-28 py-6 bg-[#162447] text-[#ffffff] font-inter font-extrabold text-[17px] rounded-[8px] mb-4 motion-preset-pop"
        >
          Register
        </button>
      </form>
    </div>
  );
}
export default Register;
