import React from "react";
import SmilieIcon from "../icons/SmilieIcon";
import {Redirect, withRouter} from "react-router";

export class RideItem extends React.Component {


    constructor(props) {
        super(props);
        this.handleRideClick = this.handleRideClick.bind(this);
        this.state = {
            showDetails: false
        }
    }

    handleRideClick() {
        this.setState({
            showDetails: true
        });
    }


    render() {
        return this.state.showDetails ? <Redirect push to={"/ride/"+this.props.ride.id }/> : <div className="list flex flex-row w-100 ListItem" onClick={this.handleRideClick}>
            <div className="w-20 bg-accent ma2"><SmilieIcon/></div>
            <div className="w-20" style={{paddingTop: "0.5rem"}}>
                {this.props.ride.start}
            </div>
            <div className="w-10 f2 font-accent">&rarr;</div>
            <div className="w-30" style={{paddingTop: "0.5rem"}}>
                {this.props.ride.destination}
            </div>
            <div className="w-20 PriceBox">
                {this.props.ride.price.toFixed(2)} €
            </div>
        </div>
    }
}

