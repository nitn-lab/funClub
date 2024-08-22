import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import PaidIcon from '@mui/icons-material/Paid';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("John Doe");
  const [about, setAbout] = useState("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque fuga quasi maxime vitae, labore dolores!");
  const [ubication, setUbication] = useState("Los Angeles, United States");
  const [personalInfo, setPersonalInfo] = useState({
    relationship: "No data",
    smoke: "No data",
    sexuality: "No data",
    ethnicity: "No data",
    bodyType: "No data",
  });
  const [isEditing, setIsEditing] = useState({
    about: false,
    ubication: false,
    personalInfo: false,
  });
  const [albums, setAlbums] = useState([]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAlbum = URL.createObjectURL(file);
      setAlbums([...albums, newAlbum]);
    }
  };

  const handleLogout = () => {
    setProfilePicture(null);
    setUsername("User");
  };

  const toggleEdit = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (e, section, key) => {
    if (section === "personalInfo") {
      setPersonalInfo((prev) => ({
        ...prev,
        [key]: e.target.value.trim() !== "" ? e.target.value : "No data"
      }));
    } else {
      section === "about" ? setAbout(e.target.value) : setUbication(e.target.value);
    }
  };

  const saveChanges = (section) => {
    toggleEdit(section);
  };

  return (
    <div className="flex flex-col items-center w-[calc(100vw-30vw)] md:w-[98vw] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full px-5 py-3 bg-black rounded-lg text-white">
        <div className="relative flex items-center gap-x-3">
          <div className="relative">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-14 h-14 rounded-full p-1.5 border-2 border-[#09d271]"
              />
            ) : (
              <AccountCircleIcon
                style={{ fontSize: "3.5rem" }}
                className="rounded-full text-white"
              />
            )}
            {/* Plus Icon */}
            <span className="absolute bottom-0 right-0 bg-main-gradient text-white rounded-full p-0.5 cursor-pointer">
              <AddAPhotoIcon
                fontSize="small"
                onClick={() => document.getElementById("fileInput").click()}
              />
            </span>
            {/* Hidden File Input */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handlePictureChange}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{username}</h2>
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

      {/* Main Content Section */}
      <div className="flex w-full mt-4 mx-auto rounded-md">
        {/* Left Sidebar */}
        <div className="w-3/4 p-6 bg-black text-white shadow scrollable-div overflow-y-auto h-[calc(100vh-20vh)]">
          {/* About Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">About</h3>
              <button onClick={() => toggleEdit("about")}><CreateIcon /></button>
            </div>
            {isEditing.about ? (
              <input
                type="text"
                value={about}
                onChange={(e) => handleInputChange(e, "about")}
                onBlur={() => saveChanges("about")}
                className="w-full p-2 brder-none outline-none bg-black text-white"
              />
            ) : (
              <p className="font-base text-base">{about}</p>
            )}
          </div>

          {/* Highlighted Stories Section */}
          <div className="my-6">
            <h3 className="text-lg font-semibold">Highlighted stories</h3>
            <div className="mt-4 grid grid-cols-6 md:grid-cols-4 gap-4">
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
          </div>

          {/* Ubication Section */}
          <div className="my-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Ubication</h3>
              <button onClick={() => toggleEdit("ubication")}><CreateIcon /></button>
            </div>
            {isEditing.ubication ? (
              <input
                type="text"
                value={ubication}
                onChange={(e) => handleInputChange(e, "ubication")}
                onBlur={() => saveChanges("ubication")}
                className="w-full p-2 rounded-lg bg-black border-none outline-none text-white"
              />
            ) : (
              <p>{ubication}</p>
            )}
          </div>

          {/* Personal Information Section */}
          <div className="my-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <button onClick={() => toggleEdit("personalInfo")}><CreateIcon /></button>
            </div>
            {isEditing.personalInfo ? (
              <ul className="mt-4 space-y-2">
                {Object.keys(personalInfo).map((key) => (
                  <li key={key}>
                    <input
                      type="text"
                      value={personalInfo[key]}
                      onChange={(e) => handleInputChange(e, "personalInfo", key)}
                      onBlur={() => saveChanges("personalInfo")}
                      className="w-full p-2 rounded-lg bg-black border-none outline-none text-white"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-4 space-y-2">
                <li>Relationship: {personalInfo.relationship}</li>
                <li>Smoke: {personalInfo.smoke}</li>
                <li>Sexuality: {personalInfo.sexuality}</li>
                <li>Ethnicity: {personalInfo.ethnicity}</li>
                <li>Body Type: {personalInfo.bodyType}</li>
              </ul>
            )}
          </div>

          {/* Interests Section */}
          <div className="my-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Interests</h3>
              <button><CreateIcon /></button>
            </div>
            <button className="mt-4 w-20 h-20 bg-purple-600 text-white py-2 rounded-full">
              Add Interest
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 p-4 text-white bg-black border-l-2 border-gray-600 pr-3 shadow">
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