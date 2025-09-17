import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import QouteBox from '../components/QouteBox';
import AddBtn from '../components/AddBtn';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/sign-or-register');
          return;
        }

        const res = await fetch('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          // توکن منقضی یا نامعتبر
          localStorage.removeItem('token');
          navigate('/sign-or-register');
          return;
        }

        if (!res.ok) {
          throw new Error(`Error ${res.status}: Unauthorized or failed`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setError(data.message || 'Unexpected response');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, [navigate]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="bg-[#F9FAFB] w-full h-dvh flex flex-col items-center justify-start">
      <Header />
      <QouteBox />
      <ul className=" w-[90%] flex flex-col items-center justify-center gap-2 mt-4">
        <li className="bg-[#ffffff] w-full rounded-[8px] flex flex-row items-center justify-center  py-4 pr-3 font-[yekan] text-[17px]">
          1404/6/25
        </li>
      </ul>
      <AddBtn />
    </div>
  );
}

export default Home;
