import React, {Component} from "react";

const checkInButtonClasses = "white w4 h2 center pa2";

export class CheckIn extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            checkInActive: false
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            checkInActive: true
        }), 3000);
    }

    render() {
        return <div onClick={this.state.checkInActive ? this.props.onCheckin : () => {}}
            className={this.state.checkInActive ? `bg-accent ${checkInButtonClasses}` : `bg-gray ${checkInButtonClasses}`}>CheckIn</div>
    }

}
