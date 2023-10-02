import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import CreateQuiz from "./routes/CreateQuiz"
import AccountMenu from "./routes/AccountMenu"
<<<<<<< Updated upstream
=======
import QuizStats from "./routes/QuizStats"
import QuizResults from "./routes/QuizResults"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
    path: "/quiz-stats",
    element: <QuizStats />
  },
  {
    path: "/quiz-results",
    element: <QuizResults />
  },
  {
>>>>>>> Stashed changes
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
