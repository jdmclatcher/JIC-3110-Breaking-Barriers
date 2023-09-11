
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from "./routes/home";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
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