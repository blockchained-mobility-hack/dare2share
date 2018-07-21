import React, {Component} from "react";
import {ListOfRides, RIDES} from "./customer/ListOfRides";
import {Link} from "react-router-dom";

export class StartPage extends Component {

    render() {
        return <div>
            <Link to="/create">Create ride</Link>
            <section>
                <ListOfRides rides={RIDES}/>
            </section>
        </div>
    }
}
