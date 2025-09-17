import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddBtn from '../components/AddBtn';
import Header from '../components/Header';

function Tasks() {
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
      <ul className=" w-[90%] flex flex-col items-center justify-center gap-2 mt-4">
        {tasks.map((t) => (
          <li
            className="bg-[#ffffff] w-full rounded-[8px] flex flex-row items-center justify-between  py-4 pr-3 font-[yekan] text-[17px]"
            key={t.tid}
            dir="rtl"
          >
            {t.title}
            <div className="flex flex-row items-center justify-end gap-2 w-[70%] pl-2">
              <div className="bg-[#ef44446c] w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center">
                <img className="w-[18px]" src="./del.svg" alt="" />
              </div>
              <div className="bg-[#6365f15b] w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center">
                <img className="w-[20px]" src="./edit.svg" alt="" />
              </div>
              <div className="bg-[#D9D9D9] w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center">
                <img className="w-[18px]" src="./tik.svg" alt="" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <AddBtn />
    </div>
  );
}

export default Tasks;
