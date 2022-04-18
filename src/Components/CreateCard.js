import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import {ProgressBarLine} from 'react-progressbar-line';

class CreateCard extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            package : null,
            key : null
        }
    }
    componentWillMount(){
        this.setState({package : this.props.package});
        this.setState({key : this.props.index});
        
    }

   

    

    render(){

        var item = this.state.package;
        var key = this.state.key;
        if(item.card_type == "burner"){
            var monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var timestamp = new Date(item.expiry);
            var formatted = timestamp.getDate() + " " + monthNames[timestamp.getMonth()];
            var type = 
            <div className="row justify-content-between" style={{marginTop:"15px"}}>
                <div className="col col-2 col-sm-4">
                    <div class="badge badge-default badge-outlined">BURNER</div>
                </div>
                <div className="col col-4">
                    <div class="text-secondary"><small>Expires: {formatted}</small></div>
                </div>
            </div>
        }
        else{
            var type = 
            <div className="row justify-content-between" style={{marginTop:"15px"}}>
                <div className="col col-2">
                    <div class="badge badge-default badge-outlined">SUBSCRIPTION</div>
                </div>
                <div className="col col-4 col-sm-8">
                    <div class="text-secondary"><small>Limit: {item.limit} {item.spent_curr}</small></div>
                </div>
            </div>
        }
        if(key % 2 == 0){
            return(
                <>
                    <Card text="secondary" className="col shadow col-md-5 col-sm-12" style = {{"marginTop" : "15px"}}> 
                        <Card.Body>
                        <Card.Title style = {{"color": "black"}}>{item.name}</Card.Title>
                        <Card.Subtitle>
                            {item.ownerId.username} <span>&#183;</span> {item.budget_name}
                        </Card.Subtitle>
                        {type}
                        <ProgressBarLine
                            value={item.spent_value}
                            min={0}
                            max={item.spent_value + item.availabe_value}
                            strokeWidth={2}
                            trailWidth={2}
                            styles={{
                            path: {
                                stroke: '#f53669'
                            },
                            trail: {
                                stroke: '#02b343'
                            },
                            text: {
                                fill: 'white',
                                textAlign: 'center',
                                fontSize: '10px'
                            }
                            }}
                        />
                        </Card.Body>
                    </Card>
                </>
            )                  
        }else{
            return(
            <>
                <Card text = "secondary" className="col shadow col-md-5 col-sm-12" style = {{"marginTop" : "15px"}}>
                    <Card.Body>
                    <Card.Title style = {{"color": "black"}}>{item.name}</Card.Title>
                    <Card.Subtitle>
                        {item.ownerId.username} <span>&#183;</span> {item.budget_name}
                    </Card.Subtitle>
                    {type}
                    <ProgressBarLine
                            value={item.spent_value}
                            min={0}
                            max={item.spent_value + item.availabe_value}
                            strokeWidth={2}
                            trailWidth={2}
                            styles={{
                            path: {
                                stroke: '#f53669'
                            },
                            trail: {
                                stroke: '#02b343'
                            },
                            text: {
                                fill: 'white',
                                textAlign: 'center',
                                fontSize: '10px'
                            },
                            borderRadius: "25px"
                            }}
                        />
                    </Card.Body>
                </Card>
                <div class="w-100"></div>
            </>
            )
        }
    }
    
}

export default CreateCard;