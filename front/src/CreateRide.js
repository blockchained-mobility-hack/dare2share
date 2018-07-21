import React, {Component} from "react";
import {StartDestinationInputs} from "./StartDestinationInputs";
import {AppHeader} from "./AppHeader";

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
            <div className="App">
                <AppHeader/>
                <StartDestinationInputs/>
                <section className="Footer">
                    <button onClick={this.handleCreate}>Create ride</button>
                </section>
            </div>
        )
    }

}
