import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = () => {
  const { roomId } = useParams();

  const call = async (element) => {
    const appId = 1338281569;
    const serverSecret = "712233a8dc504a41c4b83a9833f1b166";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Enter your name"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
        container : element,
        maxUsers : 2,
        scenario : {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
        } ,
        showScreenSharingButton : true,
        turnOnCameraWhenJoining : false,
        turnOnMicrophoneWhenJoining : false,
        showLeavingView : false,
        showRoomTimer : true,
        showLeaveRoomConfirmDialog : false,
        
    })
  };

  return <div>
    <div ref={call}/>
  </div>;
};

export default VideoCall;
