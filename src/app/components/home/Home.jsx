import React, { Component } from 'react';
import {Link} from 'react-router';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';

import Page from '../common/Page'

import { userSave, userUpdate } from '../../actions/'

class Home extends Component {

    responseFacebook(response) {
        console.log(response);
    }

    onConfirm() {
        const {name, phone, email, city, country} = this.props;
        this.props.userSave({name, phone, email, city, country});
    }

    render() {
        return (
            <Page additionalClass="home">

                <p className="title">PODIJELI SA NAMA NEKOLIKO INFORMACIJA</p>

                <div className="form">
                    <label>IME I PREZIME</label>
                    <input label="Name"
                           placeholder="Janko Marko"
                           value={ this.props.name }
                           onChange={ value => this.props.userUpdate({prop: 'name', value}) }
                    />

                    <label>E-MAIL</label>
                    <input label="email"
                           placeholder="email@email.com"
                           value={ this.props.email }
                           onChange={ value => this.props.userUpdate({prop: 'email', value}) }
                    />


                    <label> GRAD I<br/>POŠTANSKI BROJ</label>
                    <input label="city"
                           placeholder="Zagreb 10000"
                           value={ this.props.city }
                           onChange={ value => this.props.userUpdate({prop: 'city', value}) }
                    />

                    <label>DRŽAVA</label>
                    <input label="country"
                           placeholder="Hrvatska"
                           value={ this.props.country }
                           onChange={ value => this.props.userUpdate({prop: 'country', value}) }
                    />

                    <label>BROJ MOBITELA</label>
                    <input label="phone"
                           placeholder="0XX XXX XXXX"
                           value={ this.props.phone }
                           onChange={ value => this.props.userUpdate({prop: 'phone', value}) }
                    />

                </div>

                <FacebookLogin
                    textButton="POVEŽI SA FACEBOOKOM"
                    appId="1088597931155576"
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
