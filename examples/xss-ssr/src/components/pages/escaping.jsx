import React from "react";

class Escaping extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                <li>{this.props.htmlContent}</li>
                <li style={this.props.htmlStyleAttribute}>styled!</li>
                <li><a href={this.props.url}>this is a link</a></li>
            </ul>
        )
    }
}
export default Escaping;