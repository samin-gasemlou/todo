import { Link } from 'react-router-dom';

function AddBtn() {
  return (
    <Link to="/add-task">
      <div className="absolute left-0 bottom-0 m-4 w-[60px] h-[60px] rounded-[100%] bg-[#0EA5E9] flex items-center justify-center text-[30px] text-[#ffffff]">
        <span className="w-full h-full flex items-center justify-center">+</span>
      </div>
    </Link>
  );
}

export default AddBtn;
