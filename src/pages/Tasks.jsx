import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Tasks() {
  const { date } = useParams(); // تاریخ انتخاب شده
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/sign-or-register');
          return;
        }

        const res = await fetch(`http://localhost:5000/api/tasks/by-date/${date}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch tasks');

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTasks();
  }, [date, navigate]);

  return (
    <div className="bg-[#F9FAFB] w-full h-dvh flex flex-col items-center justify-start">
      <Header />
      <h2 className="text-[18px] mt-4 font-[yekanBold] text-[#111827]">{date}</h2>
      <ul className="w-[90%] flex flex-col items-center justify-center gap-2 mt-4">
        {tasks.map((t) => (
          <li
            className="bg-[#ffffff] text-[#111827] w-full rounded-[8px] flex flex-row items-center justify-between  py-4 pr-3 font-[yekan] text-[17px]"
            key={t.tid}
            dir="rtl"
          >
            {t.title}
            <div className="flex flex-row items-center justify-end gap-2 w-[70%] pl-2">
              <div className="bg-[#ef44446c] w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center">
                <img className="w-[18px]" src="/del.svg" alt="" />
              </div>
              <div className="bg-[#6365f15b] w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center">
                <img className="w-[20px]" src="/edit.svg" alt="" />
              </div>
              <div className="bg-[#D9D9D9] w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center">
                <img className="w-[18px]" src="/tik.svg" alt="" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
