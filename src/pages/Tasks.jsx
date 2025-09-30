import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditModal from '../modals/EditModal';

function Tasks() {
  const { date } = useParams();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  // حذف تسک
  const deleteTask = async (tid) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://todo-back-production-609b.up.railway.app/api/tasks/${tid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task.tid !== tid));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // تیک و کامل کردن تسک
  const toggleComplete = async (task) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(
        `https://todo-back-production-609b.up.railway.app/api/tasks/${task.tid}/complete`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedTask = await res.json();
      if (res.ok) {
        setTasks((prev) => prev.map((t) => (t.tid === task.tid ? updatedTask : t)));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `https://todo-back-production-609b.up.railway.app/api/tasks/${updatedTask.tid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: updatedTask.title }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? data : t)));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/sign-or-register');
          return;
        }

        const res = await fetch(
          `https://todo-back-production-609b.up.railway.app/api/tasks/by-date/${date}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
    <div className="bg-[#0B0C10] w-full h-dvh flex flex-col items-center justify-start">
      <h2 className="text-[32px] md:text-[45px] mt-4 font-[yekanBold] text-[#AAB2BD] motion-preset-slide-right ">
        {date}
      </h2>
      <ul className="w-[90%] flex flex-col items-center justify-center gap-2 mt-4">
        {tasks.map((t) => (
          <li
            className="bg-[#162447] motion-preset-blur-right  text-[#FFFFFF] w-full rounded-[8px] flex flex-row items-center justify-between  py-4 pr-3 font-[yekan] text-[17px]"
            key={t.tid}
            dir="rtl"
          >
            {t.title}
            <div className="flex flex-row items-center justify-end gap-2 w-[70%] pl-2">
              <div
                onClick={() => deleteTask(t.tid)}
                className="bg-[#ef44446c] motion-preset-focus  cursor-pointer w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center"
              >
                <img className="w-[18px]" src="/del.svg" alt="" />
              </div>
              <div
                onClick={() => {
                  setEditingTask(t);
                  setIsModalOpen(true);
                }}
                className="bg-[#6365f15b] motion-preset-focus w-[50px] h-[50px] cursor-pointer rounded-[100%] flex flex-row items-center justify-center"
              >
                <img className="w-[20px]" src="/edit.svg" alt="" />
              </div>
              <div
                onClick={() => toggleComplete(t)}
                className={`motion-preset-focus cursor-pointer w-[50px] h-[50px] rounded-[100%] flex flex-row items-center justify-center ${
                  t.completed ? 'bg-green-400' : 'bg-[#AAB2BD]'
                }`}
              >
                <img className="w-[18px]" src="/tik.svg" alt="" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default Tasks;
