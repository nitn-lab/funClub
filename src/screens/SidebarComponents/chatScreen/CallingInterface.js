import React, { useState, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const CallingInterface = ({ endVideoCall }) => {
    const [audioMuted, setAudioMuted] = useState(false);
    const [videoMuted, setVideoMuted] = useState(false);
    const localContainer = useRef(null);

    const toggleMuteAudio = () => {
        setAudioMuted(!audioMuted);
    };

    const toggleMuteVideo = () => {
        setVideoMuted(!videoMuted);
    };

    return ( 
        <div className="relative w-full h-[100vh] bg-black text-white mx-auto bg-opacity-75">

            <p className="text-lg text-center pt-10">Calling...</p>
          <div className='flex justify-center'>
          <div className="flex gap-10 justify-between absolute  bottom-28">
                <button
                    onClick={toggleMuteAudio}
                    className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200"
                >
                    {audioMuted ? <MicOffIcon /> : <MicIcon />}
                </button>
               
                <button
                    onClick={endVideoCall}
                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
                >
                    End Call
                </button>
                <button
                    onClick={toggleMuteVideo}
                    className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200"
                >
                    {videoMuted ? <VideocamOffIcon /> : <VideocamIcon />}
                </button>
            </div>
          </div>
        </div>
    );
};

export default CallingInterface;