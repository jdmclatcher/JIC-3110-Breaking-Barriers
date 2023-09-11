import { useNavigate } from "react-router-dom";
import { useState } from 'react';
export default function Home() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = "/Account-Settings"; 
    navigate(path);
  }
    return (
        <div>Home
            <button color="primary" className="square"
            onClick={routeChange}
              > 
              Login
            </button>
        </div>
        
    );
}