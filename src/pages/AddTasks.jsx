import SaveBtn from '../components/SaveBtn';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function AddTasks() {
  const [title, setTitle] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (res.status === 200) {
      alert('Added successfully!');
    } else {
      alert(data.message);
    }
  };
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-start">
      <form
        onSubmit={handleAddTask}
        className="w-[90%] h-[50%] flex flex-col items-center justify-center gap-10 my-8 "
      >
        <input
          className="bg-[#1B263B] text-[#ffffff] rounded-[8px] w-[80%] h-[79px] pr-4 font-[yekan] motion-preset-bounce  "
          dir="rtl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="تسک جدیدت..."
        />
        <SaveBtn />
      </form>
      <Link to="/">
        <div className="bg-[#162447] rounded-[8px] text-[#ffffff] py-2 px-4 font-[yekan] text-[18px] border-[#0EA5E9] motion-preset-bounce ">
          لیست تسک ها
        </div>
      </Link>
    </div>
  );
}

export default AddTasks;
