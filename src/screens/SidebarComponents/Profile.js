import React, { useContext, useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
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
  const [isEditing, setIsEditing] = useState({
    about: false,
    username: false,
    ethnicity: false,
  });
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (id) {
      fetchUserData(id); // Fetch user data based on user ID
    }
  }, [id]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://3.110.156.153:5000/api/v1/userById/${id}`, {
        headers: { Authorization: `${token} ` },
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
        headers: { Authorization: `${token}` },
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

  const toggleEdit = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (e, section) => {
    setUser((prev) => ({
      ...prev,
      [section]: e.target.value,
    }));
  };

  const saveChanges = (section) => {
    toggleEdit(section);

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
    <div className="flex flex-col items-center w-[calc(100vw-30vw)] md:w-[98vw] mx-auto">
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
      <div className="flex xs:block w-full mt-4 mx-auto rounded-md">
        {/* Left Sidebar */}
        <div className="w-3/4 p-6 xs:p-3 bg-black text-white shadow scrollable-div overflow-y-auto h-[calc(100vh-20vh)]">
          {/* About Section */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">About</h3>
              <button onClick={() => toggleEdit("about")}><CreateIcon /></button>
            </div>
            {isEditing.about ? (
              <input
                type="text"
                value={user.about}
                onChange={(e) => handleInputChange(e, "about")}
                onBlur={() => saveChanges("about")}
                className="w-full border-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{user.about}</p>
            )}
          </div>

          {/* Ethnicity Section */}
          <div className="my-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Ethnicity</h3>
              <button onClick={() => toggleEdit("ethnicity")}><CreateIcon /></button>
            </div>
            {isEditing.ethnicity ? (
              <input
                type="text"
                value={user.ethnicity}
                onChange={(e) => handleInputChange(e, "ethnicity")}
                onBlur={() => saveChanges("ethnicity")}
                className="w-full p-0 border-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{user.ethnicity}</p>
            )}
          </div>

          <div className="my-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Country</h3>
              <button onClick={() => toggleEdit("country")}><CreateIcon /></button>
            </div>
            {isEditing.country ? (
              <input
                type="text"
                value={user.country}
                onChange={(e) => handleInputChange(e, "country")}
                onBlur={() => saveChanges("country")}
                className="w-full p-0 border-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{user.country}</p>
            )}
          </div>

          <div className="my-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Smoking</h3>
              <button onClick={() => toggleEdit("smoking")}><CreateIcon /></button>
            </div>
            {isEditing.smoking ? (
              <input
                type="text"
                value={user.smoking}
                onChange={(e) => handleInputChange(e, "smoking")}
                onBlur={() => saveChanges("smoking")}
                className="w-full p-0 border-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{user.smoking}</p>
            )}
          </div>

          <div className="my-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Drinking</h3>
              <button onClick={() => toggleEdit("drinking")}><CreateIcon /></button>
            </div>
            {isEditing.drinking ? (
              <input
                type="text"
                value={user.drinking}
                onChange={(e) => handleInputChange(e, "drinking")}
                onBlur={() => saveChanges("drinking")}
                className="w-full p-0 border-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{user.drinking}</p>
            )}
          </div>

          <div className="my-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Personality</h3>
              <button onClick={() => toggleEdit("personality")}><CreateIcon /></button>
            </div>
            {isEditing.personality ? (
              <input
                type="text"
                value={user.personality}
                onChange={(e) => handleInputChange(e, "personality")}
                onBlur={() => saveChanges("personality")}
                className="w-full p-0 border-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{user.personality}</p>
            )}
          </div>

          <div className="my-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sexual Orientation</h3>
              <button onClick={() => toggleEdit("sexual_orientation")}><CreateIcon /></button>
            </div>
            {isEditing.sexual_orientation ? (
              <input
                type="text"
                value={user.sexual_orientation}
                onChange={(e) => handleInputChange(e, "sexual_orientation")}
                onBlur={() => saveChanges("sexual_orientation")}
                className="w-full p-0 border-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{user.sexual_orientation}</p>
            )}
          </div>
        </div>

        {/* right sidebar */}
        <div className="w-1/4 p-4 text-white bg-black border-l-2 border-gray-600 pr-3 shadow xs:flex">
          <div className="mb-6">
               <PaidIcon className="text-yellow-400 ml-3" style={{fontSize: "3rem"}}/>
                <p className="text-base my-2">200 Credits</p>
                <button className="bg-main-gradient py-1 px-2 rounded-lg">Buy Credits</button>
          </div>
         
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Activity Score</h3>
            <p className="mt-2">Your profile is 70% complete</p>
            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
              <div
                className="bg-main-gradient h-2.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Recommendations</h3>
            <p>You have no new recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;