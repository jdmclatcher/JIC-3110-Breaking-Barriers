import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import CreateQuiz from "./routes/CreateQuiz"
import AccountMenu from "./routes/AccountMenu"
import Login from "./routes/Login";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/create-quiz",
    element: <CreateQuiz />
  },
  {
    path: "/account-menu",
    element: <AccountMenu />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
