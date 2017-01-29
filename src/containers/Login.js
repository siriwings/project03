import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {loginRequest} from 'actions/authentication';
import {LoginForm} from 'components';
import Auth from '../modules/Auth';

class Login extends Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.facebookLogin=this.facebookLogin.bind(this);
        this.googleLogin=this.googleLogin.bind(this);
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // const name = encodeURIComponent(this.state.user.name);
        // const password = encodeURIComponent(this.state.user.password);
        const email = this.state.user.email;
        const password = this.state.user.password;

        return this.props.loginRequest(email, password).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    Materialize.toast(`Welcome, ${Auth.getName('session')}`, 2000);
                    browserHistory.push('/');
                }
                return;
            }
        );
    }

    facebookLogin(){location.href='/auth/facebook';};

    googleLogin(){location.href='/auth/google';}

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (

            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
                responseFacebook={this.facebookLogin}
                responseGoogle={this.googleLogin}
            />

        );
    }

}
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (email, password) => {
            return dispatch(loginRequest(email, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);