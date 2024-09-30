import React, { useContext, useState, useEffect, useRef } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeIcon from '@mui/icons-material/Mode';
import PaidIcon from '@mui/icons-material/Paid';
import { UserContext } from "../../components/context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL

const Profile = () => {

  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const [albums, setAlbums] = useState([]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAlbum = URL.createObjectURL(file);
      setAlbums([...albums, newAlbum]);
    }
  };


  useEffect(() => {
    if (id) {
      fetchUserData(id); // Fetch user data based on user ID
    }
  }, [id]);

  const fetchUserData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/userById/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setLoading(false);
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

      setProfilePicture(fetchedUser.profilePicture || null);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setLoading(false);
    }
  };

  const updateUserData = async (updatedData) => {
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/v1/updateUsers/${id}`, updatedData, {
        headers: { Authorization: `${token} ` },
      });
      setLoading(false);
      toast.success("Field updated successfully!!");
    } catch (error) {

      console.error("Failed to update user data!!");
      setLoading(false);
    }
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

    };
    updateUserData(updatedData);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setIsModalClosing(false)
  };


  const closeLogoutModal = () => {
    setIsModalClosing(true);

    setIsLogoutModalOpen(false);

  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate("/");
    setProfilePicture(null);
    toast.success("Logged out successfully!!");

  }

  const calculateProgress = () => {
    const fields = [
      user.username,
      user.about,
      user.ethnicity,
      user.country,
      user.sexual_orientation,
      user.smoking,
      user.drinking,
      user.personality,
    ];

    const filledFields = fields.filter((field) => field !== "" && field !== "No data");
    const progress = (filledFields.length / fields.length) * 100;

    return progress;
  };

  return (
    <div className="flex flex-col items-center w-[calc(100vw-30vw)] md:w-[98vw] mx-auto h-[96vh] md:h-[92vh] font-gotham">
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
            className="logout-button bg-main-gradient text-white p-1 rounded-full"
            onClick={openLogoutModal}
          >
            <ExitToAppIcon />
          </button>
        </div>
      </div>

      {/* Modal */}

      <Modal
        open={isLogoutModalOpen}
        onClose={closeLogoutModal}
        showCloseIcon={false}
        center
        classNames={{
          overlay: { background: "rgba(0, 0, 0, 0.462)" },
          modal: "customModal",
        }}
      >
        <div className="modal-content">
          <h2 className="text-xl font-semibold mb-4 text-center">Confirm Logout</h2>
          <p className="text-center mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-main-gradient text-white py-2  rounded-full hover:scale-105 w-full"
            >
              Logout
            </button>

          </div>
          <div className="flex justify-center  mt-4">
            <button
              onClick={closeLogoutModal}
              className="  py-2 rounded-full w-full hover:bg-gray-200 font-bold text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Main Content */}
      <div className="flex xs:block w-full mt-4 mx-auto rounded-md  h-full">
        {/* Left Sidebar */}
        <div className="w-3/4 p-6 xs:p-3 bg-black text-white shadow  xs:w-full  scrollable-div overflow-y-auto  h-full">

          <div className='scrollable-div overflow-y-auto  h-[68vh]'>


            <div className="">
              <h3 className="text-lg font-semibold">Highlighted stories</h3>
              <div className="my-3 grid grid-cols-5 md:grid-cols-3 gap-6">
                {albums.map((album, index) => (
                  <div
                    key={index}
                    className="relative h-36 bg-purple-200 rounded-lg overflow-hidden"
                  >
                    <img
                      src={album}
                      alt={`album ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div
                  className="relative h-36 bg-purple-200 rounded-lg text-purple-600 font-bold flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById("albumInput").click()}
                >
                  <AddAPhotoIcon fontSize="large" />
                  {/* Hidden File Input for Album */}
                  <input
                    type="file"
                    id="albumInput"
                    className="hidden"
                    onChange={handlePictureChange}
                  />
                </div>
              </div>

              <div >
                <h3 className="text-lg font-semibold">About</h3>
                <input
                  type="text"
                  value={user.about}
                  onChange={(e) => handleInputChange(e, "about")}
                  disabled={!isEditing}
                  className={`w-[50%] border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-sm p-1 mt-2 ml-2" : ""}`}
                />
              </div>


              {/* Ethnicity Section */}
              <div className='my-3'>
                <h3 className="text-lg font-semibold">Ethnicity</h3>
                <input
                  type="text"
                  value={user.ethnicity}
                  onChange={(e) => handleInputChange(e, "ethnicity")}
                  disabled={!isEditing}
                  className={`w-[50%] border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-sm p-1 mt-2 ml-2" : ""}`}
                />
              </div>

              {/* Country Section */}
              <div >
                <h3 className="text-lg font-semibold">Country</h3>
                <input
                  type="text"
                  value={user.country}
                  onChange={(e) => handleInputChange(e, "country")}
                  disabled={!isEditing}
                  className={`w-[50%] border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-sm p-1 mt-2 ml-2" : ""}`}
                />
              </div>

              <div className='my-3'>
                <h3 className="text-lg font-semibold">Sexual Orientation</h3>
                <input
                  type="text"
                  value={user.sexual_orientation}
                  onChange={(e) => handleInputChange(e, "sexual_orientation")}
                  disabled={!isEditing}
                  className={`w-[50%] border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-sm p-1 mt-2 ml-2" : ""}`}
                />
              </div>

              <div >
                <h3 className="text-lg font-semibold">Smoking</h3>
                <input
                  type="text"
                  value={user.smoking}
                  onChange={(e) => handleInputChange(e, "smoking")}
                  disabled={!isEditing}
                  className={`w-[50%] border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-sm p-1 mt-2 ml-2" : ""}`}
                />
              </div>

              <div className='my-3'>
                <h3 className="text-lg font-semibold">Drinking</h3>
                <input
                  type="text"
                  value={user.drinking}
                  onChange={(e) => handleInputChange(e, "drinking")}
                  disabled={!isEditing}
                  className={`w-[50%] border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-sm p-1 mt-2 ml-2" : ""}`}
                />
              </div>

              <div >
                <h3 className="text-lg font-semibold">Personality</h3>
                <input
                  type="text"
                  value={user.personality}
                  onChange={(e) => handleInputChange(e, "personality")}
                  disabled={!isEditing}
                  className={`w-[50%] border-none outline-none bg-black text-white ${isEditing ? "border-b-2 border-white outline-white rounded-sm p-1 mt-2 ml-2" : ""}`}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center fixed bottom-8 xs:bottom-[16rem] justify-end w-[48%] md:w-2/3 gap-x-6 xs:justify-start mt-24">
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
            <p className="mt-0.5">Your profile is {calculateProgress().toFixed(0)}% complete</p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;