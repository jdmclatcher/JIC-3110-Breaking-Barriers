import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/home";
import UserProfile from './routes/account';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/Account-Settings",
    element: <UserProfile/>
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
