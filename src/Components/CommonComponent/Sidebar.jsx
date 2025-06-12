import { useNavigate, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GiBlackBook } from "react-icons/gi";
import { MdOutlineBookmarkAdd, MdOutlineGraphicEq } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const navList = [
  { id: 1, icon: <GoHome />, path: "/" },
  { id: 2, icon: <GiBlackBook />, path: "/books" },
  { id: 3, icon: <MdOutlineBookmarkAdd />, path: "/bookmarks" },
  { id: 4, icon: <MdOutlineGraphicEq />, path: "/stats" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-screen bg-whitee">
      {/* Sidebar */}
      <div className="w-[100px] relative flex flex-col items-center py-6">
        {/* Right Border Line */}
        <div className="absolute top-6 bottom-6 right-[-1px] w-px bg-grayy rounded-full" />

        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-sm font-bold">BoiPoka</h1>
        </div>

        {/* Navigation Icons Centered Vertically */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-6">
          {navList?.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`text-3xl p-3 cursor-pointer rounded-full transition
                ${
                  currentPath === item.path
                    ? "bg-redd text-whitee"
                    : "text-grayy hover:bg-redd hover:text-whitee"
                }
              `}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Bottom Profile Icon */}
        <div className="mt-6">
          <button className="text-3xl text-grayy hover:text-textPrimary cursor-pointer">
            <CgProfile />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
