import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import _ from 'lodash';
import { hashHistory } from 'react-router'

import Page from '../common/Page'
import Form from './Form';
import InputError from '../common/input/InputError';

import { userSave, userUpdate, userCheckRegistered } from '../../actions/'

class Home extends Component {

    constructor() {
        super();
        this.inputs = [];
        this.state = {
            userid: ''
        }
    }

    responseFacebook(response) {
        console.log('responseFacebook', response);

        const { name, email } = response;
        const userid = response.userID;

        if(userid) {
            this.props.userCheckRegistered({ userid }).then(() => {
                console.log('this.props.loggedIn', this.props.loggedIn);
                if(this.props.loggedIn) {
                    hashHistory.push('/pregame');
                } else {
                    this.form.nameInput.validation(name, true);
                    this.props.userUpdate({prop: 'name', value: name});

                    this.form.emailInput.validation(email, true);
                    this.props.userUpdate({prop: 'email', value: email});

                    this.setState({ userid });
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

        const {name, phone, email, city, country} = this.props;
        this.props.userSave({name, phone, email, city, country, userid: this.state.userid}).then(() => {
            console.log('this.props.loggedIn', this.props.loggedIn);
            if(this.props.loggedIn) {
                hashHistory.push('/pregame');
            }
        });
    }

    render() {

        return (
            <Page additionalClass="home">

                <p className="title">PODIJELI SA NAMA NEKOLIKO INFORMACIJA</p>

                <Form userid={ this.state.userid }
                      userUpdate={ this.props.userUpdate }
                      onConfirm={ this.onConfirm.bind(this) }
                      ref={(input) => { this.form = input }}/>

                {this.state.userid? '' : <FacebookLogin
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
