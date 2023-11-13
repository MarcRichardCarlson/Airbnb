import React from "react";
import userService from "../../Utils/userService";

const LogoutButton: React.FC = () => {

  const handleLogout = () => {
    userService.logoutUser() // Call the logout function to clear user data and token
    console.log('Logout');
    // You can also redirect the user to the login page or perform other actions after logout
  };

  return (
    <button onClick={handleLogout} className='bg-default-red py-2 pl-3 pr-3 rounded text-white hover:bg-off-red text-sm drop-shadow-lg'>
      Logout
    </button>
  );
};

export default LogoutButton;
