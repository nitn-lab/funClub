import React, { useContext, useState, useEffect, useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeIcon from '@mui/icons-material/Mode';
import PaidIcon from '@mui/icons-material/Paid';
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {

  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState({
    username: "",
    followers: [],
    following: [],
  });
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem('jwtToken');
  const [loading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [creatingPost, setCreatingPost] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }

    const fetchPosts = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/v1/user/${id}/posts`,
        {
          headers: { authorization: `${token}` },
        }
      );
      setPosts(res.data.data)

    }
    fetchPosts();
  }, []);

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
        about: fetchedUser.about || "",
        followers: fetchedUser.followers || [],
        following: fetchedUser.following || [],
        profileImage: fetchedUser.profileImage || ""
      });
      setProfileImage(fetchedUser.profileImage || "");
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setLoading(false);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
        try {

          const response = await axios.put(`${BASE_URL}/api/v1/updateUsers/${id}`, file, {
            headers: {
              Authorization: `${token}`,
            }
          });
          console.log(response)
          setUser({ ...user, profilePicture: response.data.data.profileImage });
          toast.success("Profile picture updated successfully!");
        } catch (error) {
          console.error("Error updating profile picture:", error);
        }
      
    };
    const handleProfileRemove = () => {
      setProfileImage(null);
      const updatedUser = { ...user, profileImage: null };
      setUser(updatedUser);
      toast.success("Profile Image removed successfully!");
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
    const handleCreatePost = async (e) => {
      e.preventDefault();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const newPost = {
          image: reader.result,
          content: caption,
        };

        try {
          const res = await axios.post(`${BASE_URL}/api/v1/create`, newPost, {
            headers: { Authorization: `${token}` },
          });
          setUser((prev) => ({ ...prev, posts: [...prev.posts, res.data.data] }))
          setImageFile(null);
          setCaption("");
          setCreatingPost(false);
        } catch (error) {
          console.error("Error creating post:", error);
        }
      };
      reader.readAsDataURL(imageFile);
    };

    return (
      <div className="flex-col items-center w-[calc(100vw-25vw)] md:w-full mx-auto h-[96vh] md:h-[99vh] font-gotham rounded-lg md:rounded-none bg-black">
        <div className="w-full px-5 xs:px-3 py-3   text-white">
          <div className="flex justify-between items-center border-b-2 border-gray-600 pb-3">
            <div className="relative flex items-start gap-x-6">
              <div>
                {profileImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-24 h-24 rounded-full cursor-pointer"
                      onClick={() => setImageModal(true)}
                    />
                  </div>
                ) : (
                  <span>

                    <AccountCircleIcon
                      style={{ fontSize: "4rem" }}
                      className="rounded-full cursor-pointer"
                      onClick={() => { document.getElementById("fileInput").click(); }}
                    />
                  </span>
                )}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold pt-2">{user.username}</h2>
                <div className="flex gap-x-5 items-center mt-1 xs:block">
                  <p>{posts.length} posts</p>
                  <div className="flex items-center gap-x-5">
                    <p>{user.followers.length} followers</p>
                    <p>{user.following.length} following </p></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-6">
              <button onClick={() => navigate('/dashboard/update')}
                className="mb-4 bg-main-gradient text-white rounded-full p-2"><ModeIcon />
              </button>
            </div>
          </div>
          <div className="w-full mt-6 rounded-full shadow-lg flex gap-x-4 h-[calc(100vh-26vh)]">
            <div className='w-3/4 sm:w-full flex flex-col'>
              <div
                className="relative h-16 w-16 bg-fuchsia-700 rounded-full text-white flex items-center justify-center cursor-pointer"
                onClick={() => setCreatingPost(true)}
              >
                <div>
                  <AddAPhotoIcon fontSize="medium" />
                </div>
                {/* Hidden File Input for Album */}

              </div>
              <div className="posts-container w-full mx-auto shadow-lg flex-grow overflow-y-auto">
                <div className="w-full mt-3 xs:p-3 text-white  sm:w-full  scrollable-div overflow-y-auto  h-full">
                  {posts.length > 0 ? (<div className="grid grid-cols-4 sm:grid-cols-2  w-full h-full mt-3 gap-3">
                    {posts.map(post => {
                      return (
                        <div className="h-48 w-full rounded-md">
                          <img src={post.image} alt="image" className="w-full h-full rounded-md" />
                          <p>{post.caption}</p>
                        </div>)
                    }
                    )}
                  </div>) : (
                    <div className="flex justify-center items-center w-full h-full">
                      <div>
                        <div className="ml-7 mb-3">
                          <svg aria-label="When you share photos, they will appear on your profile." class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>When you share photos, they will appear on your profile.</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></circle><ellipse cx="48.002" cy="49.524" fill="none" rx="10.444" ry="10.476" stroke="currentColor" stroke-linejoin="round" stroke-width="2.095"></ellipse><path d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></div>
                        <h2 className="text-xl font-normal">No posts yet!</h2>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
            {/* Right Sidebar */}
            <div className="w-1/4 sm:hidden text-white h-full bg-main-gradient p-2 rounded-lg">
              <div className="mb-4">
                <PaidIcon className="text-yellow-300" style={{ fontSize: "3rem" }} />
                <p className="text-base my-2">200 Credits</p>
                <button className="bg-black py-1 px-2 rounded-lg">Buy Credits</button>
              </div>
              <div className="mb-2">
                <h3 className="text-lg">Activity Score</h3>

                <p className="mt-0.5">Your profile is {calculateProgress().toFixed(0)}% complete</p>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div className="h-2 bg-white  rounded-full my-2" style={{ width: `${calculateProgress()}%` }}></div>
                </div>
                <div className="my-4">

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <Modal
          open={imageModal}
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

                className="bg-main-gradient text-white py-2  rounded-full hover:scale-105 w-full"
              >
                Logout
              </button>
            </div>
            <div className="flex justify-center  mt-4">
              <button

                className="  py-2 rounded-full w-full hover:bg-gray-200 font-bold text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Create Post Modal*/}
        <Modal open={creatingPost} onClose={() => {
          setCreatingPost(false);
          setImageFile(null); setCaption("")
        }} center classNames={{
          overlay: { background: "rgba(0, 0, 0, 0.462)" },
          modal: "customPostModal",
        }} closeIcon={
          <FaTimes className="text-2xl p-1.5 float-end bg-black rounded-full text-white" />
        }>
          {!imageFile && <div className=" flex items-center justify-center h-full">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="hidden w-fit" 
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer text-main-gradient flex items-center w-fit">
              <svg aria-label="Icon to represent media such as images or videos" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
            </label>
          </div>}

          {imageFile && (
            <div className="flex items-start gap-x-3 overflow-hidden h-full w-full">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded Preview"
                className="w-3/4 h-full mx-auto rounded-md object-cover "
              />
              <div className="pt-5 pl-3">
                <h3>Add caption</h3>
                <input
                  autoFocus
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="bg-fuchsia-800 outline-none pl-2 pb-0.5  w-full text-white placeholder-white"
                  required
                />
                <button
                  type="button"
                  onClick={handleCreatePost}
                  className={`bg-black mt-2 absolute bottom-5 right-5 text-white py-2 px-4 rounded-full ${!imageFile ? "hidden" : ""}`}
                  disabled={!imageFile}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  };

  export default Profile;