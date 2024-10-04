import React, { useContext, useState, useEffect, useRef } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeIcon from '@mui/icons-material/Mode';
import PaidIcon from '@mui/icons-material/Paid';
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from 'react-responsive-modal';
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserProfile = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        profilePicture:"",
        username: "",
        country: "",
        ethnicity: "",
        smoking: "",
        drinking: "",
        personality: "",
        sexual_orientation: "",
        about: "",
        followers: [],
        following: [],
        posts: []
    });
    const token = localStorage.getItem('jwtToken');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchUserData(id);
        }
    }, []);

    const fetchUserData = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/userById/${id}`, {
                headers: { Authorization: `${token}` },
            });
            setLoading(false);
            const fetchedUser = response.data.data;
            console.log(response.data.data, "api")
            setUser({
                username: fetchedUser.username,
                country: fetchedUser.country,
                ethnicity: fetchedUser.ethnicity,
                smoking: fetchedUser.smoking,
                drinking: fetchedUser.drinking,
                personality: fetchedUser.personality,
                sexual_orientation: fetchedUser.sexual_orientation,
                about: fetchedUser.about || "",
                followers: fetchedUser.followers || [],
                following: fetchedUser.following || [],
                posts: fetchedUser.posts || [],
                profilePicture: fetchedUser.profile_picture,
            });
        } catch (error) {
            console.error("Failed to fetch user data", error);
            setLoading(false);
        }
    };

    return (
        
       <>
         <div className="flex flex-col items-center w-[calc(100vw-30vw)] md:w-[98vw] mx-auto h-[96vh] md:h-[92vh] font-gotham bg-main-gradient">
            {/* Profile Header */}
            <div className="flex justify-between items-center w-full px-5 xs:px-3 py-3 bg-black rounded-lg text-white">
                <div className="relative flex items-center gap-x-3">
                    <div className="relative">
                        {user.profilePicture ? (
                            <div className="relative">
                                <img
                                    src={user.profilePicture}
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
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{user.username}</h2>
                        <p className="text-[rgb(9,210,113)]">Online</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex xs:block w-full mt-4 mx-auto rounded-md shadow-lg h-[calc(100vh-18vh)]">
                {/* Left Sidebar */}
                <div className="w-3/4 p-6 xs:p-3 bg-black text-white  xs:w-full  scrollable-div overflow-y-auto rounded-l-md  h-full">
                    <div >
                        <div>
                            <div >
                                <h3 className="text-lg font-semibold">About</h3>
                                <h4>{user.about}</h4>
                            </div>
                            {/* Ethnicity Section */}
                            <div className='my-3'>
                                <h3 className="text-lg font-semibold">Ethnicity</h3>
                                <h4>{user.ethnicity}</h4>
                            </div>
                            {/* Country Section */}
                            <div >
                                <h3 className="text-lg font-semibold">Country</h3>
                                <h4>{user.country}</h4>
                            </div>
                            <div className='my-3'>
                                <h3 className="text-lg font-semibold">Sexual Orientation</h3>
                                <h4>{user.sexual_orientation}</h4>
                            </div>
                            <div >
                                <h3 className="text-lg font-semibold">Smoking</h3>
                                <h4>{user.smoking}</h4>
                            </div>
                            <div className='my-3'>
                                <h3 className="text-lg font-semibold">Drinking</h3>
                                <h4>{user.drinking}</h4>
                            </div>
                            <div >
                                <h3 className="text-lg font-semibold">Personality</h3>
                                <h4>{user.personality}</h4>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Right Sidebar */}
                <div className="w-1/4 xs:w-full xs:border-t-2  sm:p-2 text-white bg-black border-l-2 border-gray-600 pr-3 rounded-r-md scrollable-div overflow-y-auto p-6 h-full">
                    <div className="mb-2">
                        <div className="my-4">
                            <p>{user.followers.length} Followers</p>
                            <p>{user.following.length} Following </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </>
    );
};

export default UserProfile;