import React from 'react';

const UserInfo = ({ username, profileImage }) => {
  return (
    <div className=" flex items-center gap-x-3 bg-main-gradient px-3 py-1.5 rounded-md">
    <img
        src={profileImage}
        alt="Profile"
        className="w-10 h-10 object-cover rounded-full"
      />
      <div className=" text-white text-lg font-semibold">
        <p className="truncate">{username}</p>
      </div>
      
    </div>
  );
};

export default UserInfo;