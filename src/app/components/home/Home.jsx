import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import _ from 'lodash';
import { browserHistory } from 'react-router'

import Page from '../common/Page'
import Form from './Form';

import { userSave, userUpdate, userCheckRegistered } from '../../actions/'

class Home extends Component {

    constructor() {
        super();
        this.inputs = [];
        this.state = {
            userID: ''
        }
    }

    responseFacebook(response) {
        console.log('responseFacebook', response);

        const {userID , name, email} = response;

        if(userID) {
            this.props.userCheckRegistered({ userID }).then(() => {
                console.log('this.props.loggedIn', this.props.loggedIn);
                if(this.props.loggedIn) {
                    browserHistory.push('/pregame');
                } else {
                    this.form.nameInput.validation(name, true);
                    this.props.userUpdate({prop: 'name', value: name});

                    this.form.emailInput.validation(email, true);
                    this.props.userUpdate({prop: 'email', value: email});

                    this.setState({ userID });
                }
            });
        }
    }

    onConfirm() {
        this.inputs = [
            this.form.nameInput,
            this.form.emailInput,
            this.form.countryInput,
            this.form.cityInput,
            this.form.phoneInput
        ];

        var allValid = _.every(this.inputs, (input)=>
        {
            console.log('onConfirm is valid', input.state.valid);
            return input.state.valid
        });

        if(!allValid) return;

        const {name, phone, email, city, country, userID} = this.props;
        this.props.userSave({name, phone, email, city, country, userID}).then(() => {
            console.log('this.props.loggedIn', this.props.loggedIn);
            if(this.props.loggedIn) {
                browserHistory.push('/pregame');
            }
        });
    }

    render() {

        return (
            <Page additionalClass="home">

                <p className="title">PODIJELI SA NAMA NEKOLIKO INFORMACIJA</p>

                <Form userID={ this.state.userID }
                      userUpdate={ this.props.userUpdate }
                      onConfirm={ this.onConfirm.bind(this) }
                      ref={(input) => { this.form = input }}/>

                {this.state.userID? '' : <FacebookLogin
                    textButton="POVEŽI SA FACEBOOKOM"
                    appId="253686335106538"
                    autoLoad={true}
                    fields="name,email"
                    callback={this.responseFacebook.bind(this)} /> }

                {this.props.errorMessage? <InputError
                    errorClass="error-message"
                    errorMessage={this.props.errorMessage} /> : ''}
            </Page>
        )
    }
}

const mapStateToProps = (state) =>
{
    const { name, phone, email, city, country, errorMessage, loggedIn } = state.userForm;
    return { name, phone, email, city, country, errorMessage, loggedIn }
};

export default connect(mapStateToProps, { userSave, userUpdate, userCheckRegistered })(Home);
