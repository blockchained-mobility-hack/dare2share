import React, {Component} from "react";
import Dare2ShareIcon from "../icons/Dare2ShareIcon";



const MenuIcon = props => (
    <svg width={29} height={22} {...props}>
        <g fill="#F67264" fillRule="nonzero">
            <rect width={29} height={4} rx={2} />
            <rect y={9} width={29} height={4} rx={2} />
            <rect y={18} width={29} height={4} rx={2} />
        </g>
    </svg>
);



export class AppHeader extends Component {

    render() {
        return <div className="App-header font-accent"><a href="/"><MenuIcon className="fl"/></a><Dare2ShareIcon/></div>
    }

}
