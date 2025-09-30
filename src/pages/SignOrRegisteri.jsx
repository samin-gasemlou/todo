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
    <div className="w-full h-full flex flex-col items-center justify-start bg-[#0B0C10]">
      <div className="logo mt-10 motion-preset-bounce  ">
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
          className="px-28 py-6 bg-[#162447] text-[#ffffff] font-inter font-extrabold text-[18px] rounded-[25px] motion-preset-pop"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-28 py-6 bg-[#162447] text-[#ffffff] font-inter font-extrabold text-[17px] rounded-[25px] mt-4 mb-4 motion-preset-pop"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default SignOrRegister;
