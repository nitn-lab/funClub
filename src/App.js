import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/SignUp";
import NotFound from "./screens/Error/NotFound";
import Dashboard from "./screens/DashBooard/Dashboard";
import Chats from './screens/SidebarComponents/chatScreen/Chats';
import ChatScreen from './screens/SidebarComponents/chatScreen/ChatScreen';
import Nearby from './screens/SidebarComponents/NearbyComponent/Nearby'
import ForgetPassword from './screens/Auth/ForgetPassword';
import MainLayout from './screens/Auth/MainLayout';

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
    path: "/forget-password",
    element: <ForgetPassword />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "chats",
        element: <Chats />,
      },
      {
        path: "chat/:id",
        element: <ChatScreen />,
      },
      {
        path: "nearby",
        element: <Nearby />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;