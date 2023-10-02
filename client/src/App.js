import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import CreateQuiz from "./routes/CreateQuiz"
import AccountMenu from "./routes/AccountMenu"
import QuizStats from "./routes/QuizStats"
import QuizResults from "./routes/QuizResults"
import
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
    path: "/quiz-stats",
    element: <QuizStats />
  },
  {
    path: "/quiz-results",
    element: <QuizResults />
  },
  {
    path: "/take-quiz",
    element: <TakeQuiz />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
