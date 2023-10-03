import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import CreateQuiz from "./routes/CreateQuiz"
import AccountMenu from "./routes/AccountMenu"
import './App.css';
import CreateAccount from "./routes/CreateAccount";

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
    path: "/create-account",
    element: <CreateAccount />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
