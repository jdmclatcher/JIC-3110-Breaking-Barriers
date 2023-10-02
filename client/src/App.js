import Login from "./routes/Login";

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
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;


/* Uncomment this to run quiz selection page
import './App.css'
import QuizDropdown from './QuizDropdown';
import React from "react";

function App() {
  return (
    <div className="h-screen grid place-items-start p-4 bg-gradient-to-r from-gray-500 to-gray-700">
      <QuizDropdown />
    </div>
  );
}

export default App;
*/