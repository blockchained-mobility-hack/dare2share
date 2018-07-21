import React, {Component} from "react";

export class AppFooter extends Component {


    render() {
        return <section className="Footer">
            {this.props.children}
        </section>
    }

}
