import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CallPopup = ({ open, handlePopup, logo }) => {
  const [roomIdModalOpen, setRoomIdModalOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdModal = () => {
    setRoomIdModalOpen(!roomIdModalOpen);
    handlePopup(); 
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    } else {
      alert("Please enter a valid Room ID");
    }
  };

  return (
    <>
      <div>
        <Modal
          onClose={handlePopup}
          open={open}
          center
          closeIcon={
            <FaTimes className="text-2xl p-1.5 float-end bg-[#fd558d] rounded-full text-white" />
          }
          classNames={{
            overlay: { background: "rgba(0, 0, 0, 0.462)" },
            modal: "customModal",
          }}
        >
          <img src={logo} width="80" className="mx-auto" alt="logo" />
          <div className="text-center mt-5">
            <p className="text-2xl font-semibold italic text-[#fd558d]">
              Want to connect with your friends & have long conversations?
            </p>
            <p className="text-xl my-5 leading-loose font-medium">
              To enjoy unlimited audio and video calls and to always stay connected with your
              friends
              <br /> get coins from FUNCLUB.
            </p>
            <button
              onClick={handleRoomIdModal}
              className="w-full active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 text-white text-lg font-bold"
            >
              Get coins
            </button>
          </div>
        </Modal>

        {/* New Modal for Room ID */}
        <Modal
          onClose={handleRoomIdModal}
          open={roomIdModalOpen}
          center
          closeIcon={
            <FaTimes className="text-2xl p-1.5 float-end bg-[#fd558d] rounded-full text-white" />
          }
          classNames={{
            overlay: { background: "rgba(0, 0, 0, 0.462)" },
            modal: "customModal",
          }}
        >
          <div className="text-center mt-5">
            <h2 className="text-2xl font-semibold">Enter Room ID</h2>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Room ID"
              className="mt-4 p-2 border rounded w-full"
            />
            <button
              onClick={handleJoinRoom}
              className="mt-4 w-full active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 text-white text-lg font-bold"
            >
              Join Room
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CallPopup;