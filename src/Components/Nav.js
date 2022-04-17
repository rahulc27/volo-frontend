import { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import UserCard from "./UserCard";

class Nav extends Component{

    render(){
        return(
            <>
            <Router>
                <ul class="nav nav-tabs col-12">
                    <li className="nav-item"><Link className="nav-link active" to="/userCards">Your</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="">All</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="">Blocked</Link></li>
                </ul>
                <Routes>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/userCards" component= {UserCard}></Route>
                </Routes>
            </Router>
            </>
        );
    }
}

export default Nav;