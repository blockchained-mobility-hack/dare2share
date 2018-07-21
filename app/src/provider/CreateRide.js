import React, {Component} from "react";
import {StartDestinationInputs} from "../StartDestinationInputs";
import {Criteria} from "../Criteria";
import { Link } from 'react-router-dom'
import {AppFooter} from "../scaffold/AppFooter";

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
                <StartDestinationInputs/>
                <Criteria initialValues={initialCreateFormValues}/>
                <AppFooter>
                    <Link to="/overview">Create ride</Link>
                </AppFooter>
            </div>
        )
    }

}
