import { Component } from "react";
import { backendUrlFindAllOwners, backendUrlFindByOwners } from "./BackendURL";
import Dropdown from 'react-dropdown';
import CardGroup from 'react-bootstrap/CardGroup';
import CreateCard from "./CreateCard";
import axios from 'axios';

class UserCard extends Component{

    constructor(){
        super()
        this.state={
            owners : [],
            cards : [],
            ownerId : "",
            errorMessage : "",
            successMessage : "",
            isOwnerSelect : false
        }
    }


    componentWillMount(){
        this.fetchOwners();
    }

    fetchOwners = () => {
        this.setState({errorMessage:"Please wait...", successMessage:""});

        axios.get(backendUrlFindAllOwners)
        .then(
            response => {
                this.setState({owners : response.data});
                console.log(response.data);
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

    fetchCards = (value) => {
        this.setState({errorMessage:"Please wait...", successMessage:"",isOwnerSelect:true});
        var url  = backendUrlFindByOwners + value;
        console.log(value);
        axios.get(url)
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
        //this.setState({ownerId : value});
        this.fetchCards(value);
    };

    render(){
        var owners = this.state.owners;
        var cards = this.state.cards;

        if (!this.state.isOwnerSelect){
            var view = <div class="alert alert-primary" role="alert" style={{width:"100%", textAlign: "center"}}>
                Please select user.
            </div> 
        }
        else{

            if(cards.length > 0){
                var view = <CardGroup className="row justify-content-between" style = {{marginLeft: 10}}>
                {
                    cards.map((item, index) => (
                        <CreateCard key = {index} package = {item} index = {index}></CreateCard>
                    ))
                }
                </CardGroup>
            }
            else{
                var view = <div class="alert alert-danger" role="alert" style={{width:"100%", textAlign: "center"}}>
                Cards not found for this user.
            </div> 
            }
        }
        return(
            <>
            <select class="form-control selectpicker" data-live-search="true" searchable="Search here.." style={{margin:10}} onChange = {this.handlechange}>
                <option value="" disabled selected>Choose your name and ID</option>
                {
                    owners.map((item, index) => (
                        <option value={item.owner_id}>{item.owner_id} - {item.username}</option>
                    ))
                }                
            </select>
            {view}            
            </>
        );
    }
}

export default UserCard;