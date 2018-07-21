import React, {Component} from "react";
import {Form, Text} from 'informed';

export class Criteria extends Component {

    render() {
        return (
            <section>
                <h1>Criteria</h1>
                <Form id="criteria-form"  initialValues={this.props.initialValues}>
                    <div>
                        <label htmlFor="text-seat-cost">Costs for ride per seat:</label>
                        <Text className="TextInput" field="seatCost" id="text-seat-cost"/>
                    </div>
                    <div>
                        <label htmlFor="text-passenger-seats">Available Passenger seats:</label>
                        <Text className="TextInput" field="seatCount" id="text-passenger-seats"/>
                    </div>
                    <div>
                        <label htmlFor="text-tolerance">Available Passenger seats:</label>
                        <Text className="TextInput" field="tolerance" id="text-tolerance"/>
                    </div>
                    <div>
                        <label htmlFor="text-delay-fee">Available Passenger seats:</label>
                        <Text className="TextInput" field="delayFee" id="text-delay-fee"/>
                    </div>
                    <div>
                        <label htmlFor="text-no-show">Available Passenger seats:</label>
                        <Text className="TextInput" field="noShowFee" id="text-no-show"/>
                    </div>

                </Form>

            </section>
        )
    }

}
