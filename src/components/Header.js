import logo from '../images/Vector.svg';

function Header({ children }) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="logo" />
            {children}
        </header>
    )
}

export default Header;