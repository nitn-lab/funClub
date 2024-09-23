import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PrimeReactProvider } from 'primereact/api';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserProvider} from "./components/context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PrimeReactProvider>
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

      </PrimeReactProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
