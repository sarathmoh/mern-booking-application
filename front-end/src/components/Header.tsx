import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800">
      <div className=" container m-auto flex justify-between items-center pt-6" >
        <span className="text-3xl text-white font-bold tracking-tight "><Link to="/">
        </Link>Holidays.com</span>
        <span className="flex ">
          <Link to="/sign-in" className="flex items-center text-blue-300 font-bold hover:bg-gray-100 bg-white text-xl px-4">Sign In</Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
