import React, {Component} from "react";
import { Form, Text } from 'informed';

export class StartDestinationInputs extends Component {




    render() {
        return <Form id="start-destination" initialValues={{
            start: "Kaufingerstraße",
            destination: "Oranienburgerstr"
        }}>
            <div><Text field="start" id="start-field" /></div>
            <div><Text field="destination" id="destination-field" /></div>
        </Form>

    }

}
