import { useState, useEffect } from 'react';

function EditModal({ isOpen, onClose, task, onSave }) {
  const [title, setTitle] = useState('');
  // هر وقت task تغییر کنه، مقدار state به‌روز میشه
  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  if (!isOpen) return null; // وقتی مودال بسته‌ست چیزی رندر نشه

  const handleSave = () => {
    onSave({ ...task, title });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-[#1B263B] w-[90%] max-w-md rounded-lg p-6 shadow-lg motion-preset-pop ">
        <h2 className="text-lg font-[yekan] text-center text-[#ffffff] mb-4">ویرایش تسک</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border bg-[#162447] text-[#ffffff] border-[#1E90FF] rounded p-2 mb-4 text-right font-[yekan]"
          placeholder="عنوان جدید تسک"
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="bg-[#E63946] text-[#ffffff] px-4 py-2 rounded font-[yekan]"
          >
            لغو
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded font-[yekan]"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
