import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/SignUp";
import NotFound from "./screens/Error/NotFound";
import Dashboard from "./screens/DashBooard/Dashboard";
import Chats from './screens/SidebarComponents/chatScreen/Chats';
import ChatScreen from './screens/SidebarComponents/chatScreen/ChatScreen';
import Nearby from './screens/SidebarComponents/NearbyComponent/Nearby';
import Feeds from './screens/SidebarComponents/Feeds';
import Live from './screens/SidebarComponents/Live';
import Suggestions from "./screens/SidebarComponents/Suggestions";
import Profile from './screens/SidebarComponents/Profile';
import ForgetPassword from './screens/Auth/ForgetPassword';
import MainLayout from './screens/Auth/MainLayout';
import SubscriptionDetails from "./screens/SidebarComponents/SubscriptionDetails";
import UserProfile from './screens/SidebarComponents/UserProfile';
import UpdateProfile from './screens/SidebarComponents/UpdateProfile';

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
        element: <Chats showChatScreen={true} shouldNavigate={false}/>,
      },
      {
        path: "chat/:id",
        element: <ChatScreen showChatScreen={true}/>,
      },
      {
        path: "nearby",
        element: <Nearby />,
      },
      {
        path: "feeds",
        element: <Feeds />,
      },
      {
        path: "live",
        element: <Live />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "suggestions",
        element: <Suggestions />,
      },
      {
        path: "subscription",
        element: <SubscriptionDetails />,
      },
      {
        path: "user/:id",
        element: <UserProfile />,
        errorElement: <NotFound />,
      },
      {
        path: "update",
        element: <UpdateProfile />,
        errorElement: <NotFound />,
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
  
}

export default App;