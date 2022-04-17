import { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AllCards from "./AllCards";
import UserCard from "./UserCard";

class Home extends Component{

    render(){
        return(
            <>
            <div className="container">
                <div className="row justify-content-between">
                    <h3 className="name font-weight-bold col-m-4 con-sm-4">Virtual Cards</h3>
                    <button id = "addCard" type="button" class="btn btn-light shadow bg-white rounded col-m-2 col-sm-4">+ Virtual card</button>
                </div>
                <div className="row" style={{"marginTop":"3%"}}>
                    <Router>
                        <ul class="nav nav-tabs col-12">
                            <li className="nav-item"><Link className="nav-link" to="/userCards">Your</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/allCards">All</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/blocked">Blocked</Link></li>
                        </ul>
                        <Routes>
                            <Route exact path="/" element={<UserCard></UserCard>}></Route>
                            <Route exact path="/userCards" element= {<UserCard></UserCard>}></Route>
                            <Route exact path="/allCards" element= {<AllCards/>}></Route>
                            <Route exact path="/blocked" element= {UserCard}></Route>
                        </Routes>
                    </Router>
                </div>

            </div>
            
            </>
        );
    }
}

export default Home;