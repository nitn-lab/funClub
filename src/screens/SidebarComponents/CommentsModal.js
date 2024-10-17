import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { FaTimes } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CommentsModal = ({ open, onClose, likes }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('jwtToken'); 
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const userPromises = likes.map(async (userId) => {
    //                 const res = await axios.get(`${BASE_URL}/api/v1/userById/${userId}`, {
    //                     headers: { authorization:  `${token}` },
    //                 });
    //                 console.log(res.data, 'gdg')
    //                 return res.data.data; // Assuming the user data is in data
    //             });
                
    //             const usersData = await Promise.all(userPromises); // Wait for all promises to resolve
    //             setUsers(usersData);
    //         } catch (err) {
    //             console.error("Error fetching users:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (likes.length > 0) {
    //         fetchUsers();
    //     } else {
    //         setLoading(false); // No likes to fetch
    //     }
    // }, [likes, token]); // Add token as a dependency if it can change


    return (
        <Modal open={open} onClose={onClose} center
        closeIcon={
          <FaTimes className="text-2xl p-1.5 float-end bg-black rounded-full text-white" />
        }
        classNames={{
          overlay: { background: "rgba(0, 0, 0, 0.462)" },
          modal: "customSearchModal",
        }}>
            <div className='p-3'>
            <h2>Liked By</h2>
            {/* <ul>
            {loading && <p>Loading...</p>}
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <li key={index} className='flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition-all cursor-pointer rounded-sm mt-3' onClick={() => navigate(`/dashboard/user/${user._id}`)}>
                        <img src={user.profileImage} alt={user.username} className='h-8 w-8 rounded-full object-cover'/>
                        <h4>{user.username}</h4>
                        </li>
                    ))
                ) : (
                    <li>No users found.</li>
                )}
            </ul> */}
            </div>
        </Modal>
    );
};

export default CommentsModal;