import { useNavigate } from "react-router-dom";

interface PropsTypes {
    name:string,
    onLogout:()=> void,
    toggleDropdown: ()=> void,
}


  const UserOptions:React.FC<PropsTypes> = ({ name, onLogout, toggleDropdown }) => {

    const navigate = useNavigate();
    return (
        <div className="absolute top-[50px] right-[12px] mt-2 w-48 bg-gray-200 rounded-lg shadow-lg">
          {/* Outward pointing arrow */}
          <div 
            className="absolute -top-2 right-4 w-4 h-4 bg-gray-2d00 rotate-[-45deg]"
            style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
          ></div>
    
          <div className="px-4 py-2 border-b">
            <span className="text-gray-800 font-medium">Jatin</span>
          </div>
          <ul className="py-1">
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  console.log('Navigate to Write');
                  navigate('/');
                  toggleDropdown();
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  console.log('Navigate to Write');
                  navigate('/blog/publish');
                  toggleDropdown();
                }}
              >
                Write
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                onClick={() => {
                  onLogout();
                  toggleDropdown();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      );
    };
    
    export default UserOptions;