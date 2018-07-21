import React from "react";

export class RideItem extends React.Component {


    render() {
        return <li className="list flex flex-row w-100">
            <div className="w-30">
                from:<br/>
                {this.props.ride.start}
            </div>
            <div>&rarr;</div>
            <div className="w-30">
                to:<br/>
                {this.props.ride.destination}
            </div>
            <div className="w-30" style={{backgroundColor: "#bbbbbb"}}>
                X,XX €
            </div>
        </li>
    }
}


