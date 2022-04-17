import { Component } from "react";

class UserCard extends Component{

    constructor(){
        super()
        this.state={
            cards : [],
            errorMessage : "",
            successMessage : ""
        }
    }

    render(){
        return(
            <div>Hello</div>
        );
    }
}

export default UserCard;