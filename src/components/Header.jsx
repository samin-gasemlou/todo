function Header() {
  return (
    <div className="bg-[#ffffff] w-[90%] h-[60px] mt-8 rounded-[8px] flex flex-row items-center justify-between p-4">
      <img src="burgerMenu.svg" alt="user" />
      <img className="w-[40px] h-[40px]" src="logo.png" alt="" />
      <img src="user.svg" alt="user" />
    </div>
  );
}

export default Header;
