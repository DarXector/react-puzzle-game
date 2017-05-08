import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import _ from 'lodash';

import Page from '../common/Page'
import TextInput from '../common/input/TextInput';

import { userSave, userUpdate } from '../../actions/'

class Home extends Component {

    constructor() {
        super();
        this.inputs = [];
    }

    responseFacebook(response) {
        console.log(response);
    }

    commonValidate() {
        return true;
    }

    validateEmail(value) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(value);
    }

    validatePhone(value) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(value);
    }

    onConfirm() {
        this.inputs = [this.nameInput, this.emailInput, this.countryInput, this.cityInput, this.phoneInput];

        var allValid = _.every(this.inputs, (input)=>
        {
            console.log('onConfirm is valid', input.state.valid);
            return input.state.valid
        });

        if(!allValid) return;

        const {name, phone, email, city, country} = this.props;
        this.props.userSave({name, phone, email, city, country});
    }

    render() {
        return (
            <Page additionalClass="home">

                <p className="title">PODIJELI SA NAMA NEKOLIKO INFORMACIJA</p>

                <div className="form">
                    <label>IME I PREZIME</label>
                    <TextInput
                        className="input-holder"
                        invalidClass="input-error"
                        text="Janko Marko"
                        required={true}
                        minCharacters={6}
                        validate={ this.commonValidate }
                        onChange={ value => this.props.userUpdate({prop: 'name', value}) }
                        errorMessage="Ime nije validno"
                        emptyMessage="Ime je obavezno"
                        ref={(input) => { this.nameInput = input }} />

                    <label>E-MAIL</label>
                    <TextInput
                        className="input-holder"
                        invalidClass="input-error"
                        text="mail@mail.com"
                        required={true}
                        minCharacters={6}
                        validate={ this.validateEmail }
                        onChange={ value => this.props.userUpdate({prop: 'email', value}) }
                        errorMessage="Email nije validan"
                        emptyMessage="Email je obavezan"
                        ref={(input) => { this.emailInput = input }} />

                    <label> GRAD I<br/>POŠTANSKI BROJ</label>
                    <TextInput
                        className="input-holder"
                        invalidClass="input-error"
                        text="Zagreb"
                        required={true}
                        minCharacters={3}
                        validate={ this.commonValidate }
                        onChange={ value => this.props.userUpdate({prop: 'city', value}) }
                        errorMessage="Grad nije validan"
                        emptyMessage="Grad je obavezan"
                        ref={(input) => { this.cityInput = input }} />

                    <label>DRŽAVA</label>
                    <TextInput
                        className="input-holder"
                        invalidClass="input-error"
                        text="Hrvatska"
                        required={true}
                        minCharacters={3}
                        validate={ this.commonValidate }
                        onChange={ value => this.props.userUpdate({prop: 'country', value}) }
                        errorMessage="Država nije validna"
                        emptyMessage="Država je obavezna"
                        ref={(input) => { this.countryInput = input }} />

                    <label>BROJ MOBITELA</label>
                    <TextInput
                        className="input-holder"
                        invalidClass="input-error"
                        text="+3XXXXXXXXXXX"
                        required={true}
                        minCharacters={6}
                        validate={ this.validatePhone }
                        onChange={ value => this.props.userUpdate({prop: 'phone', value}) }
                        errorMessage="Broj mobitela nije validan"
                        emptyMessage="Broj mobitela je obavezan"
                        ref={(input) => { this.phoneInput = input }} />
                </div>

                <FacebookLogin
                    textButton="POVEŽI SA FACEBOOKOM"
                    appId="253686335106538"
                    autoLoad={false}
                    fields="public_profile,email"
                    callback={this.responseFacebook.bind(this)} />

                <a onClick={this.onConfirm.bind(this)}>POTVRDI</a>
            </Page>
        )
    }
}

const mapStateToProps = (state) =>
{
    const { name, phone, email, city, country } = state.userForm;
    return { name, phone, email, city, country }
};

export default connect(mapStateToProps, { userSave, userUpdate })(Home);
