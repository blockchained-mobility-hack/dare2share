import React from "react";
import SmilieIcon from "../icons/SmilieIcon";

export class RideItem extends React.Component {


    render() {
        return <li className="list flex flex-row w-100 ListItem">
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
        </li>
    }
}
