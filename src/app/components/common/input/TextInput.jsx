import React, { Component } from 'react';

import InputError from './InputError';

class TextInput extends Component {

    constructor(){
        super();
        //most of these variables have to do with handling errors
        this.state = {
            isEmpty: true,
            value: "",
            valid: false,
            errorMessage: "Input is invalid",
            errorVisible: false
        };
    }

    handleChange(event){
        //validate the field locally
        this.validation(event.target.value);

        //Call onChange method on the parent component for updating it's state
        //If saving this field for final form submission, it gets passed
        // up to the top component for sending to the server
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }

    validation (value, valid) {
        //The valid variable is optional, and true if not passed in:
        if (typeof valid === 'undefined') {
            valid = true;
        }

        let message = "";
        let errorVisible = false;

        //we know how to validate text fields based on information passed through props
        if (!valid) {
            //This happens when the user leaves the field, but it is not valid
            //(we do final validation in the parent component, then pass the result
            //here for display)
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }
        else if (this.props.required && !value) {
            //this happens when we have a required field with no text entered
            //in this case, we want the "emptyMessage" error message
            message = this.props.emptyMessage;
            valid = false;
            errorVisible = true;
        }
        else if (value.length < this.props.minCharacters) {
            console.log('validation not enough characters');
            //This happens when the text entered is not the required length,
            //in which case we show the regular error message
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }

        //setting the state will update the display,
        //causing the error message to display if there is one.

        this.setState({
            value: value,
            isEmpty: !!value,
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        });

    }

    handleBlur (event) {
        //Complete final validation from parent element when complete
        var valid = this.props.validate(event.target.value);
        console.log('handleBlur', valid);
        //pass the result to the local validation element for displaying the error
        this.validation(event.target.value, valid);
    }

    render() {

        return (
            <div className={this.props.className}>
                <input
                    placeholder={this.props.text}
                    className={`input ${this.state.errorVisible? this.props.invalidClass : ``}`}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    value={this.state.value} />

                {this.state.errorVisible? <InputError
                    errorClass="error-message"
                    errorMessage={this.state.errorMessage} /> : ''}
            </div>
        );
    }
}

export default TextInput;