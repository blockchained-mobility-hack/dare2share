import React, {Component} from "react";

export class CreateRide extends Component {

    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this)
    }


    handleCreate() {
        console.log("ride created")
    }


    render() {
        return (
            <div>
                <h1>Create Ride</h1>
                <button onClick={this.handleCreate}>Create</button>
            </div>)
    }

}
