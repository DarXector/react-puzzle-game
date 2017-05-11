import React, {Component} from 'react';
import TextInput from '../common/input/TextInput';

class Form extends Component {

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

    render() {

        const {userid, userUpdate, onConfirm} = this.props;

        return (
            <div className={ `form ${userid? '' : 'hidden'}` }>
                <label>IME I PREZIME</label>
                <TextInput
                    className="input-holder"
                    invalidClass="input-error"
                    text="Janko Marko"
                    required={true}
                    minCharacters={6}
                    validate={ this.commonValidate }
                    onChange={ value => userUpdate({prop: 'name', value}) }
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
                    onChange={ value => userUpdate({prop: 'email', value}) }
                    errorMessage="Email nije validan"
                    emptyMessage="Email je obavezan"
                    ref={(input) => { this.emailInput = input }} />

                <label> GRAD I<br/>POŠTANSKI BROJ</label>
                <TextInput
                    className="input-holder"
                    invalidClass="input-error"
                    text="Zagreb"
                    required={true}
                    minCharacters={2}
                    validate={ this.commonValidate }
                    onChange={ value => userUpdate({prop: 'city', value}) }
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
                    onChange={ value => userUpdate({prop: 'country', value}) }
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
                    onChange={ value => userUpdate({prop: 'phone', value}) }
                    errorMessage="Broj mobitela nije validan"
                    emptyMessage="Broj mobitela je obavezan"
                    ref={(input) => { this.phoneInput = input }} />

                <a onClick={ onConfirm }>POTVRDI</a>
            </div>
        )
    }
}

export default Form;
