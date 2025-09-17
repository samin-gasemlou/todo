import { Link } from 'react-router-dom';

function AddBtn() {
  return (
    <Link to="/add-task">
      <div className="absolute right-0  m-7 w-[60px] h-[60px] rounded-[100%] bg-[#0EA5E9] flex items-center justify-center text-[30px] text-[#ffffff]">
        <span className="w-full h-full flex items-center justify-center font-[yekanBold]">+</span>
      </div>
    </Link>
  );
}

export default AddBtn;
