import React, {Component} from "react";
import {Form, Text} from 'informed';

export class StartDestinationInputs extends Component {

    render() {
        return <Form id="start-destination" className={"w-100 center"} initialValues={{
            start: "Kaufingerstraße 15, München",
            destination: "Oranienburgerstraße 1, Berlin"
        }}>
            <div className={"w-100 center"}><Text className={"tc w-100 center" } field="start" id="start-field" /></div>
            <div className={"w-100 center"}><Text className={"tc w-100 center"} field="destination" id="destination-field" /></div>
        </Form>

    }

}
