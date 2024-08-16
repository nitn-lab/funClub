import React from 'react';

const UserInfo = ({ username, profileImage }) => {
  return (
    <div className=" flex items-center gap-x-3 bg-main-gradient p-3  rounded-md">
    <img
        src={profileImage}
        alt="Profile"
        className="w-12 h-12 object-cover rounded-full"
      />
      <div className=" text-white text-lg font-semibold">
        <p>{username}</p>
      </div>
      
    </div>
  );
};

export default UserInfo;