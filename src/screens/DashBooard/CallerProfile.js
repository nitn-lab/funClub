import React from "react";

const CallerProfile = ({ caller }) => {
  return (
    <div className="text-primary-dark bg-main-gradient p-3 m-2 rounded-md ">
      <img src={caller.profile_url} className="h-16 w-16 rounded-full" />
      <div className="text-left mt-1.5 text-base font-semibold">
        <h5>Name - {caller.firstname}</h5>
        <h5>Gender - {caller.gender}</h5>
        <h5>City - {caller.city}</h5>
        <h5>Looking For - {caller.lookingFor}</h5>
        <h5>Followers - {caller.followers}</h5>
        <h5>Following - {caller.following}</h5>
      </div>
      <div className="border-2 border-white mt-3 p-2 rounded-md">
      <h3 className="text-xl font-semibold mb-3">Recent Post</h3>
        <img src={caller.post} className=""/>
      </div>
    </div>
  );
};

export default CallerProfile;
