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

  // تاریخ‌های یکتا از تسک‌ها
  const uniqueDates = [...new Set(tasks.map((task) => task.date))];

  return (
    <div className="bg-[#F9FAFB] w-full h-dvh flex flex-col items-center justify-start">
      <Header />
      <QouteBox />

      <ul className=" w-[90%] flex flex-col items-center justify-center gap-2 mt-4">
        {uniqueDates.map((date) => (
          <li
            key={date}
            onClick={() => navigate(`/tasks/${date}`)}
            className="bg-[#ffffff] w-full rounded-[8px] flex flex-row items-center justify-center  py-4 pr-3 font-[yekanBold] text-[#111827] text-[17px] cursor-pointer"
          >
            {date}
          </li>
        ))}
      </ul>

      <AddBtn />
    </div>
  );
}

export default Home;
