import SaveBtn from '../components/SaveBtn';
import Header from '../components/Header';
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
    <div className="bg-[#F9FAFB] w-full h-dvh flex flex-col items-center justify-start">
      <Header />
      <form
        onSubmit={handleAddTask}
        className="w-[90%] h-[50%] flex flex-col items-center justify-center gap-10 my-8"
      >
        <input
          className="bg-[#FFFFFF] rounded-[8px] w-[90%] h-[79px] pr-4 font-[yekan]"
          dir="rtl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="تسک جدیدت..."
        />
        <input
          className="bg-[#FFFFFF] rounded-[8px] w-[90%] h-[79px] p-4 font-[yekan] text-[#6B7280]"
          type="date"
        />
        <SaveBtn />
      </form>
      <Link to="/tasks">
        <div className="bg-[#ffffff] rounded-[8px] text-[#0EA5E9] py-2 px-4 font-[yekan] text-[18px] border-[#0EA5E9]">
          😍کلیک کن تسک هاتو ببین
        </div>
      </Link>
    </div>
  );
}

export default AddTasks;
