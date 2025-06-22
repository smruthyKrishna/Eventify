import { useState, useEffect } from "react";

import Login from "../Login/Login";
import './Home.css';

export default function Home(props){  
    // localStorage.clear();
    const [isLoggedIn, setLoggedIn] = useState("false");

    useEffect(() => {
        const intervalId =  setInterval(() => {
            const loginStatus = localStorage.getItem("loginStatus");
            setLoggedIn(loginStatus);
       // }, [])
    }, 5000)
    return () => clearInterval(intervalId);  // cleanup
}, []); 
   

    if (!isLoggedIn || isLoggedIn === "false"){
        return(
            <div className="content">
                <div>
                <h1>Eventify</h1>
                    <p className="tagline">
                        <em> ‘ Simplify ’ your Events </em>
                    </p>
                    <p className="about">
                    Step into the World of Effortless Events with EVENTIFY 🚀
                    Discover the ultimate toolkit for event planning and participation. Whether you're signing up, managing schedules, or tracking attendees, EVENTIFY makes it seamless. No more chaos, no more confusion — just smooth, intuitive workflows that do the heavy lifting for you. Packed with smart features and designed for real humans (not techies), EVENTIFY is where your event dreams turn into organized reality.
                    Your event, your way — powered by EVENTIFY.
                    </p>
                </div>
                
                <Login/>
            </div>
        )

    }

    else{
        return(
            <div className = "content">
                <div>
                <h1>Eventify</h1>
                    <p className="tagline">
                        <em> ‘ Simplify ’ your Events </em>
                    </p>
                    <p className="about">
                    Explore the magic of our application 'EVENTIFY'.
                    A go-to solution for managing amazing events effortlessly. From easy sign-ups to registering and managing event schedules, our user-friendly platform has everything you need for a flawless experience. 
                    With powerful features, trust our system to handle the details, and let's bring your event vision to life!!!
                    </p>
                </div>
            </div>
            
        )
    }
    
}