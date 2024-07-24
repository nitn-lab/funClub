import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/SignUp";
import NotFound from "./screens/Error/NotFound";
import Dashboard from "./screens/DashBooard/Dashboard";
import Interest from "./screens/InterestForm/Interest";
import Chats from './chatScreen/Chats';
import ChatScreen from './chatScreen/ChatScreen';
import ForgetPassword from './screens/Auth/ForgetPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
    // errorElement: <NotFound />,
  },
  {
    path: "/interest",
    element: <Interest />,
    // errorElement: <NotFound />,
  },
  {
    path : '/chats',
    element: <Chats />,
     // errorElement: <NotFound />,
  },
  {
    path : '/chat/:id',
    element: <ChatScreen />,
    // errorElement: <NotFound />,
  },
  {
    path : '/forget-password',
    element: <ForgetPassword />,
    // errorElement: <NotFound />,
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
