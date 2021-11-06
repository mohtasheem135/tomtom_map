import React from 'react';
import "./landing.css"
// import img from "../landing/images/Ambulance.png"
// import Login from '../login/Login'
// import Register from '../register/Register'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Landing = () => {
    return (
        <>
            <div className="main-body">
                <div class="menu-container">
                    <nav class="head-nav">
                        <ul>
                            <li><button class="btn-1">About</button></li>
                            <li><button class="btn-1">Services</button></li>

                        </ul>
                    </nav>

                </div>
                <div className="img">
                    {/* <img src={img} /> */}
                </div>
                <span className="text text-1">Sarathi</span>
                <span className="text text-2">Connecting Ambulances Saving Lives</span>
                <button className="rapid-btn">Rapid Booking</button>
                <Router>
                    <div>

                        <nav class="foot-nav">
                            <ul>
                                <button className='btn-solid-lg'><Link to="/register" className='btn-solid-lg-col'>Register</Link></button>
                                <button className='btn-solid-lg'><Link to="/login" className='btn-solid-lg-col'>Login</Link></button>
                            </ul>
                        </nav>
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />

                    </div>

                </Router>


            </div>



        </>
    )
}

export default Landing
