import React, {Component} from "react";
import {ListOfRides, RIDES} from "./customer/ListOfRides";
import {Link} from "react-router-dom";
import {AppFooter} from "./scaffold/AppFooter";

export class StartPage extends Component {

    render() {
        return <div>
            <div className="InputStart">
               Munich
            </div>
            <div className="InputStart silver">
                search for rides
            </div>
            <section>
                <ListOfRides rides={RIDES}/>
            </section>
            <AppFooter>
                <Link to="/create">Create ride</Link>
            </AppFooter>
        </div>
    }
}
