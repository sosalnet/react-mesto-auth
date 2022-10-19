import React from "react";
import Header from "./Header";
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';

class Register extends React.Component {
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
        const { password, email } = e.target;
        auth.register(password, email).then((res) => {
            if (res) {
                this.setState(
                    {
                        message: ''
                    },
                    () => {
                        this.props.history.push('/sign-in');
                    }
                );
            }
            else {
                this.setState(
                    {
                        message: 'Что-то пошло не так.'
                    }
                );
            }
        })
    }
    render() {
        return (
            <div>
                <Header>
                    <Link to='/sign-in' className="header__nav-link">Войти</Link>
                </Header>
                <section className="sign">
                    <form className='login__form' name='register' onSubmit={this.handleSubmit}>
                        <h2 className="sign__title">Регистрация</h2>
                        <input className="sign__input" name='email' id='email' placeholder='Почта' type='email' value={this.state.email} onChange={this.handleChange} required />
                        <input className="sign__input" name='password' id='password' placeholder='Пароль' type='password' value={this.state.email} onChange={this.handleChange} required />
                        <button className="sign__submit" name='submit' type='submit' aria-label="Войти">Зарегистрироваться</button>
                        <p className="sign__subtitle">
                            Уже зарегистрированы?
                            <Link to='/sign-in' className="sign__link">
                                {' '}
                                Войти
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        )
    }
}

export default withRouter(Register);
