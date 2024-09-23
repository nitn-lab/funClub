import React, { useContext, useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import ModeIcon from '@mui/icons-material/Mode';
import PaidIcon from '@mui/icons-material/Paid';
import { UserContext } from "../../components/context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [user, setUser] = useState({
    username: "",
    country: "",
    ethnicity: "",
    smoking: "",
    drinking: "",
    personality: "",
    sexual_orientation: "",
    about: "",
    relationship: "No data",
    bodyType: "No data",
  });
  const token = localStorage.getItem('jwtToken');
  const [isEditing, setIsEditing] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (id) {
      fetchUserData(id); // Fetch user data based on user ID
    }
  }, [id]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://3.110.156.153:5000/api/v1/userById/${id}`, {
        headers: { Authorization: `${token}` },
      });

      const fetchedUser = response.data.data;
      setUser({
        username: fetchedUser.username,
        country: fetchedUser.country,
        ethnicity: fetchedUser.ethnicity,
        smoking: fetchedUser.smoking,
        drinking: fetchedUser.drinking,
        personality: fetchedUser.personality,
        sexual_orientation: fetchedUser.sexual_orientation,
        about: fetchedUser.about || "No data",
        relationship: fetchedUser.relationship || "No data",
        bodyType: fetchedUser.bodyType || "No data",
      });
      setAlbums(fetchedUser.albums || []);
      setProfilePicture(fetchedUser.profilePicture || null);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const updateUserData = async (updatedData) => {
    try {
      await axios.put(`http://3.110.156.153:5000/api/v1/updateUsers/${id}`, updatedData, {
        headers: { Authorization: `${token} ` },
      });
      toast.success("Field updated successfully!!");
    } catch (error) {
      console.error("Failed to update user data!!");
    }
  };

  const handleLogout = () => {
    setProfilePicture(null);
    // Handle logout logic here
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e, field) => {
    setUser((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const saveChanges = () => {
    toggleEdit();

    // Prepare updated data based on the current state
    const updatedData = {
      username: user.username,
      about: user.about,
      ethnicity: user.ethnicity,
      smoking: user.smoking,
      drinking: user.drinking,
      personality: user.personality,
      sexual_orientation: user.sexual_orientation,
      relationship: user.relationship,
      bodyType: user.bodyType,
      profilePicture,
      albums,
    };

    // Send updated data to the API
    updateUserData(updatedData);
  };

  return (
    <div className="flex flex-col items-center w-[calc(100vw-30vw)] md:w-[98vw] mx-auto h-[96vh] md:h-[92vh]">
      {/* Profile Header */}
      <div className="flex justify-between items-center w-full px-5 xs:px-3 py-3 bg-black rounded-lg text-white">
        <div className="relative flex items-center gap-x-3">
          <div className="relative">
            {profilePicture ? (
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-14 h-14 rounded-full p-1.5 border-2 border-[#09d271]"
                />
                <button onClick={() => setProfilePicture(null)} className="absolute -top-3 left-0 text-white text-3xl">&times;</button>
              </div>
            ) : (
              <AccountCircleIcon
                style={{ fontSize: "3.5rem" }}
                className="rounded-full bg-main-gradient"
              />
            )}
            <span className="absolute bottom-1 -right-1.5 text-white cursor-pointer">
              <AddAPhotoIcon fontSize="small" onClick={() => document.getElementById("fileInput").click()} />
            </span>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setProfilePicture(imageUrl);
                }
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p className="text-[rgb(9,210,113)]">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-x-6">
          <button className="bg-main-gradient text-white p-1 rounded-full">
            <SettingsIcon />
          </button>
          <button
            className="bg-main-gradient text-white p-1 rounded-full"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex xs:block w-full mt-4 mx-auto rounded-md  h-full">
        {/* Left Sidebar */}
        <div className="w-3/4 p-6 xs:p-3 bg-black text-white shadow scrollable-div overflow-y-auto xs:w-full">


          {/* About Section */}
          <div className=''>
            <h3 className="text-lg font-semibold">About</h3>
            <input
              type="text"
              value={user.about}
              onChange={(e) => handleInputChange(e, "about")}
              disabled={!isEditing}
              className={`w - full border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-md p-1 mt-2" : ""}`}
            />
          </div>

          {/* Ethnicity Section */}
          <div className={isEditing ? "bg-gray-800 p-2 rounded my-3" : "my-3"}>
            <h3 className="text-lg font-semibold">Ethnicity</h3>
            <input
              type="text"
              value={user.ethnicity}
              onChange={(e) => handleInputChange(e, "ethnicity")}
              disabled={!isEditing}
              className={`w - full border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-[#09d271]" : ""}`}
            />
          </div>

          {/* Country Section */}
          <div className={isEditing ? "bg-gray-800 p-2 rounded my-3" : "my-3"}>
            <h3 className="text-lg font-semibold">Country</h3>
            <input
              type="text"
              value={user.country}
              onChange={(e) => handleInputChange(e, "country")}
              disabled={!isEditing}
              className={`w - full border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-[#09d271]" : ""}`}
            />
          </div>

          <div className="flex items-center fixed bottom-8 xs:bottom-[16rem] justify-end w-[48%] md:w-2/3 gap-x-6 xs:justify-start">



            {!isEditing && <button onClick={toggleEdit}
              className="mb-4 bg-main-gradient text-white rounded-full p-2"><ModeIcon /></button>}

            {isEditing && (

              <button
                onClick={saveChanges}
                className="mb-4 bg-main-gradient text-white rounded-lg py-2 px-3"
              >
                Save
              </button>

            )}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 xs:w-full xs:border-t-2 p-4 sm:p-2 text-white bg-black border-l-2 border-gray-600 pr-3 shadow ">
          <div className="mb-4">
            <PaidIcon className="text-yellow-400 ml-3" style={{ fontSize: "3rem" }} />
            <p className="text-base my-2">200 Credits</p>
            <button className="bg-main-gradient py-1 px-2 rounded-lg">Buy Credits</button>
          </div>


          <div className="mb-2">
            <h3 className="text-lg font-semibold">Activity Score</h3>
            <p className="mt-0.5">Your profile is 70% complete</p>
            <div className="h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-main-gradient w-[70%] rounded-full mt-2"></div>
            </div>
          </div>

        </div>

        {/* Fixed Save Button */}

      </div>
    </div>
  );
};

export default Profile;