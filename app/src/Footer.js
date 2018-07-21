import React, {Component} from "react";

export class Footer extends Component {


    render() {
        return <section className="Footer">
            {this.props.children}
        </section>
    }

}
