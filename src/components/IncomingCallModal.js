import React from "react";

const IncomingCallModal = ({ callerId, onAccept, onReject }) => {
  return (
    <div
    style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
      className="incoming-call-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
    >
      <div className="bg-white p-6 rounded-lg text-center">
        <h3 className="text-lg font-bold">Incoming Call</h3>
        <p>
          Call from:
          {/* {caller} */}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onAccept}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
