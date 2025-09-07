import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signOrReg.css';

function SignOrRegister() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/'); // اگه توکن هست مستقیم میره Home
  }, [navigate]);

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-start bg-gradient-to-t from-[#6365f19c] to-[#6365f19c]  bg-[#6365f197]">
      <div className="logo mt-10">
        <img className="object-cover" src="logo.png" alt="logo" />
      </div>
      <div className="w-full text-center mt-6">
        <h1 className="font-inter text-[26px] font-extrabold text-[#ffffff]">To Do Your Best</h1>
      </div>
      <div className="text-center mt-4">
        <p className="font-inter text-[13px] font-bold text-[#ffffff]">
          "Every small task completed <br></br> is a step closer to your goal."
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-6">
        <button
          onClick={() => navigate('/login')}
          className="px-28 py-6 bg-[#ffffff] text-[#0EA5E9] font-inter font-extrabold text-[18px] rounded-[25px]"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-28 py-6 bg-[#ffffff] text-[#0EA5E9] font-inter font-extrabold text-[17px] rounded-[25px] mt-4 mb-4"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default SignOrRegister;
