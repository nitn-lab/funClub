import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UpdateProfile = () => {
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    about: '',
    country: '',
    personality: '',
    smoking: '',
    drinking: '',
    ethnicity: '',
    sexual_orientation: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get (`${BASE_URL}/api/v1/userById/${id}`, {
        headers: { Authorization:  `${token} `},
      });
      setLoading(false);
      const fetchedUser = response.data.data;
      setUserData({
        username: fetchedUser.username,
        country: fetchedUser.country,
        ethnicity: fetchedUser.ethnicity,
        smoking: fetchedUser.smoking,
        drinking: fetchedUser.drinking,
        personality: fetchedUser.personality,
        sexual_orientation: fetchedUser.sexual_orientation,
        about: fetchedUser.about || '',
      });
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}/api/v1/updateUsers/${id}`, userData, {
        headers: { Authorization:  `${token}` },
      });
      console.log(res)
      if (res.status === 403) {
        navigate('/');
      } else {
        toast.success('Field updated successfully!!');
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to update user data!!', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-[calc(100vw-25vw)] md:w-full mx-auto h-[96vh] md:h-[99vh] font-gotham rounded-lg md:rounded-none bg-black text-white p-8 scrollable-div overflow-y-auto">
      <h2 className="text-center font-semibold italic text-xl underline underline-offset-4">Edit Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full mt-12">
          <div className="flex sm:block items-center justify-center w-full gap-x-16 my-12">
          <label className="flex items-center gap-x-3  w-1/2 sm:w-full">
          Username
            <input
            className="bg-gray-800 rounded-lg p-2 w-full"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex items-center gap-x-3 w-1/2 sm:w-full sm:my-12">
            Country
            <input 
             className="bg-gray-800 rounded-lg w-full p-2"
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
            />
          </label>
          </div>

          <div className="flex sm:block items-center justify-center w-full gap-x-12 my-12">
          <label className="flex items-center gap-x-3  w-1/2 sm:w-full">
          Ethnicity
            <input
            className="bg-gray-800 rounded-lg p-2 w-full"
              type="text"
              name="ethnicity"
              value={userData.ethnicity}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex items-center gap-x-3  w-1/2 sm:w-full sm:my-12">
          Personality
            <input
            className="bg-gray-800 rounded-lg p-2 w-full"
              type="text"
              name="personality"
              value={userData.personality}
              onChange={handleInputChange}
            />
          </label>
          </div>

          <div className="flex sm:block items-center justify-center w-full gap-x-20 my-12">
          <label className="flex items-center gap-x-3  w-1/2 sm:w-full">
          Smoking
            <input
            className="bg-gray-800 rounded-lg p-2 w-full"
              type="text"
              name="smoking"
              value={userData.smoking}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex items-center gap-x-3 w-1/2 sm:w-full sm:my-12">
            Drinking
            <input
             className="bg-gray-800 rounded-lg w-full p-2"
              type="text"
              name="drinking"
              value={userData.drinking}
              onChange={handleInputChange}
            />
          </label>
          </div>

          <div className="flex sm:block items-center justify-center w-full gap-x-8 my-12">
          
          <label className="flex items-center gap-x-3 w-1/2 sm:w-full">
            Sexual Orientation
            <input
             className="bg-gray-800 rounded-lg w-full p-2"
              type="text"
              name="sexual_orientation"
              value={userData.sexual_orientation}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex items-center gap-x-3 w-1/2 sm:w-full sm:mt-12">
            Bio
            <input
             className="bg-gray-800 rounded-lg w-full p-2"
              type="text"
              name="about"
              value={userData.about}
              onChange={handleInputChange}
            />
          </label>
          </div>
          <button type="submit" className="float-right bg-main-gradient hover:scale-105 p-2 rounded-lg sm:mb-16">Update</button>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;