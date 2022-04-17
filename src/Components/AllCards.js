import { Component } from "react";
import { backendUrlFindAllCards } from "./BackendURL";
import axios from 'axios';
import CardGroup from 'react-bootstrap/CardGroup';
import CreateCard from "./CreateCard";

class AllCards extends Component{

    constructor(){
        super()
        this.state={
            cards : [],
            errorMessage : "",
            successMessage : ""
        }
    }

    componentWillMount(){
        this.fetchCards();
    }

    fetchCards = () => {
        this.setState({errorMessage:"", successMessage:""});

        axios.get(backendUrlFindAllCards)
        .then(
            response => {
                this.setState({cards : response.data});
                console.log(response.data);
            }).catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    this.setState({errorMessage : error.response.data.message, successMessage : ""})
                }
                else{
                    this.setState({errorMessage : "Please Check Your Details or Try Again Later", successMessage : ""})
                }
                
            });
    } 

    render(){

        var cards = this.state.cards;
        if(cards.length > 0){
            return(
                <CardGroup className="row justify-content-around">
                    {
                        cards.map((item, index) => (
                            <CreateCard key = {index} package = {item} index = {index}></CreateCard>
                        ))
                    }
                </CardGroup>
            );
        }
        return(
            <div class="alert alert-primary" role="alert">
                Cards Not Found !!
            </div>   
        )

    }
}

export default AllCards;