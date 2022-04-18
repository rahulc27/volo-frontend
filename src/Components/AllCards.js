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
            errorMessage : "Please Wait...",
            successMessage : "",
            search : "",
        }
    }

    componentWillMount(){
        this.fetchCards();
    }

    fetchCards = () => {
        this.setState({errorMessage:"Please wait...", successMessage:""});

        axios.get(backendUrlFindAllCards)
        .then(
            response => {
                this.setState({cards : response.data});
                console.log(response.data);
                if(this.state.cards.length == 0){
                    this.setState({errorMessage : "Cards Not found !!!"});
                }
            }).catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    this.setState({errorMessage : error.response.data.message, successMessage : ""})
                }
                else{
                    this.setState({errorMessage : "Please wait or Try Again Later", successMessage : ""})
                }
                
            });
    } 
    handlechange = event => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name,value);
        const {formValue} = this.state;
        this.setState({
            search:value})
        
    };

    render(){
        var searchCards = [];
        if(this.state.search == ""){
            searchCards = this.state.cards;
        }
        else{
            for (let i = 0, len = this.state.cards.length; i < len; i++) {
                var s = this.state.cards[i].name.toLocaleUpperCase();
                if(s.match(this.state.search.toLocaleUpperCase())){
                    searchCards.push(this.state.cards[i]);
                }
              }
        }
        
        return(
            <>
                <label class="sr-only" for="inlineFormInputGroupUsername2">Card Name</label>
                <div class="input-group col-md-3 col-sm-12" style={{margin:10}} >
                <div class="input-group-prepend">
                    <div class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg></div>
                </div>
                <input type="text" class="form-control col-md-12 col-sm-12" id="inlineFormInputGroupUsername2" placeholder="Card Name" onChange={this.handlechange}/>
                </div>
                <CardGroup className="row justify-content-between" style = {{marginLeft: 10}}>
                    {
                        searchCards.map((item, index) => (
                            <CreateCard key = {index} package = {item} index = {index}></CreateCard>
                        ))
                    }
                </CardGroup>
            </>
        );
        
        

    }
}

export default AllCards;