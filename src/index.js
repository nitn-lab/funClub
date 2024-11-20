import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PrimeReactProvider } from "primereact/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./components/context/UserContext";
import { SignOutProvider } from "./components/context/SignOutContext";
import Theme from "../src/Theme.js";
import store from "./store/userStore.js";
import { WebSocketProvider } from "../src/components/context/WebSocketContext.js";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
root.render(
  <React.StrictMode>
    <UserProvider>
      <SignOutProvider>
        <PrimeReactProvider>
          <WebSocketProvider>
            <AgoraRTCProvider client={client}>
              <GoogleOAuthProvider clientId="403139165421-duq9a81purrj9ibcpuejji90v5qopcmj.apps.googleusercontent.com">
                <App />
                <ToastContainer
                  autoClose={3000}
                  position="bottom-right"
                  theme="dark"
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeButton={false}
                  closeOnClick
                  draggable
                  pauseOnHover
                />
              </GoogleOAuthProvider>
            </AgoraRTCProvider>
          </WebSocketProvider>
        </PrimeReactProvider>
      </SignOutProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
