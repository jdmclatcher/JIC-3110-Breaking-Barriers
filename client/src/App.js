import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import CreateQuiz from "./routes/CreateQuiz";
import AccountMenu from "./routes/AccountMenu";
import QuizStats from "./routes/QuizStats";
import QuizResults from "./routes/QuizResults";
import Login from "./routes/Login";
import TakeQuiz from "./routes/TakeQuiz";
import Blank from "./routes/Blank";

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
    path: "/quiz-stats",
    element: <QuizStats />
  },
  {
    path: "/quiz-results",
    element: <QuizResults />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/take-quiz",
    element: <TakeQuiz />
  },
  {
    path: "/blank",
    element: <Blank />
  }
]);


const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
