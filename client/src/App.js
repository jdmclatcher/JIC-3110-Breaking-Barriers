import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import CreateQuiz from "./routes/CreateQuiz"
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/create-quiz",
    element: <CreateQuiz />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
