import React from "react";
import DOMPurify from 'isomorphic-dompurify';

class DangerousInnerHtml extends React.Component {

    constructor() {
        super();
        this.state = {name: "b<img src='none.png' onerror='console.log(666)'>", email: ""}
    }

    onFormSubmit = (event) => {
        event.preventDefault();
    }

    onNameChangeHandler = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChangeHandler = (event) => {
        this.setState({email: event.target.value});
    }

    render() {
        return (
            <div>
                <h1>Dangerous name!</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <label htmlFor={"name-input"} defaultValue={"Name"}>Name: </label>
                        <input name={"name-input"} onChange={this.onNameChangeHandler} type={"text"}
                               value={this.state.name}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor={"email-input"} defaultValue={"Email"}>Email: </label>
                        <input name={"email-input"} onChange={this.onEmailChangeHandler} type={"email"}
                               placeholder={"email"} value={this.state.email}/>
                    </div>
                    <br/>
                    <div>
                        <button type={"submit"}>Submit</button>
                    </div>
                </form>
                <span><h5>Name: <span dangerouslySetInnerHTML={{__html: this.state.name }}></span></h5></span>
                <span><h5>Email: {this.state.email}</h5></span>
            </div>
        )
    }
}
export default DangerousInnerHtml;