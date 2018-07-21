import React, {Component} from "react";
import {StartDestinationInputs} from "./StartDestinationInputs";
import {AppHeader} from "./AppHeader";
import {Criteria} from "./Criteria";


const initialCreateFormValues = {
    seatCost: "45 €",
    seatCount: "4",
    tolerance: "25 min",
    delayFee: "10 €",
    noShowFee: "20 €"
}

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
                <Criteria initialValues={initialCreateFormValues}/>
                <section className="Footer">
                    <button onClick={this.handleCreate}>Create ride</button>
                </section>
            </div>
        )
    }

}
