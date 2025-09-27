import { Link } from 'react-router-dom';

function AddBtn() {
  return (
    <Link to="/add-task">
      <div className="absolute md:right-8 right-0  m-7 w-[60px] h-[60px] rounded-[100%] bg-blue-500 flex items-center justify-center text-[30px] text-[#ffffff] motion-preset-bounce ">
        <span className="w-full h-full flex items-center justify-center font-[yekanBold]">+</span>
      </div>
    </Link>
  );
}

export default AddBtn;
