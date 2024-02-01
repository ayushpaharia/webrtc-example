const Navbar = () => {
  return (
    <nav className="flex mt-12 bg-[#2e2e2e] py-6 px-20 mx-auto rounded-full container">
      <ul className="text-2xl">
        <li className="">
          <a
            href="/"
            className="font-black relative text-blue-500 hover:text-blue-500 after:scale-x-[0]
              after:content-[''] after:absolute after:h-2 after:w-full after:bg-blue-500 after:rounded-full 
              after:-bottom-1 after:left-0 hover:after:scale-x-[1] after:origin-left after:transition-all after:duration-300 after:ease-in-out
              "
          >
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
