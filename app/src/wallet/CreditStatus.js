import React, {Component} from "react";

export class CreditStatus extends Component {


    render() {
        return <div>
            <p>Credit:</p>
            <p className="b">{this.props.balance}</p>
        </div>
    }

}
