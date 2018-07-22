import React, {Component} from "react";
import {Form, Text} from 'informed';

export class Criteria extends Component {

    render() {
        return (
            <section>
                <p className="font-accent b">Ride configuration</p>
                <div className="dt w-100 pa2">
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Costs for ride per seat</div>
                        <div className="dtc">25 €</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Available seats</div>
                        <div className="dtc">4</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Detour tolerance</div>
                        <div className="dtc">15 km</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Tolerance for coming late</div>
                        <div className="dtc">15 min</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Latest possible arrival</div>
                        <div className="dtc">45 min</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Passenger delay fee</div>
                        <div className="dtc">0 €</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Passenger no show fee</div>
                        <div className="dtc">25 €</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Driver delay fee</div>
                        <div className="dtc">0 €</div>
                    </div>
                    <div className="dt-row">
                        <div className="dtc w-80 tl">Driver no show fee</div>
                        <div className="dtc">5 €</div>
                    </div>
                </div>
            </section>
        )
    }

}
