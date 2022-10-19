import React from "react";
import Header from "./Header";
import { Link, withRouter } from "react-router-dom";
import * as auth from '../utils/auth.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault()
        if (!this.state.email || !this.state.password) {
            return;
          }
          auth.authorize(this.state.email, this.state.password)
            .then((data) => {
              if (data.token) {
                this.setState({ email: "", password: "" }, () => {
                  this.props.handleLogin();
                  this.props.history.push("/");
                });
              }
            })
            .catch((err) => console.log(err));
        }
    render() {
        return (
            <div>
                <Header>
                    <Link to='/sign-up' className="header__nav-link">Регистрация</Link>
                </Header>
                <section className="sign">
                    <form className='login__form' name='login' onSubmit={this.handleSubmit}>
                        <h2 className="sign__title">Вход</h2>
                        <input className="sign__input" name='email' id='email' placeholder='Почта' type='email' value={this.state.email} onChange={this.handleChange} required />
                        <input className="sign__input" name='password' id='password' placeholder='Пароль' type='password' value={this.state.email} onChange={this.handleChange} required />
                        <button className="sign__submit" name='submit' type='submit' aria-label="Войти">Войти</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default withRouter(Login);
