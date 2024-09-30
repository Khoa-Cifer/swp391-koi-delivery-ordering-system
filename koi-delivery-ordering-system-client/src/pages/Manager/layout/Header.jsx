import logo from '../../../assets/logo.png';

function Header() {
    return (
        <div className="header">
            <div className="header-left">
        <div className="logo"><img src={logo} alt="Logo" style={{ width: "80px", height: "80px" }} /></div>
                <h3>Dashboard</h3>
                <h3>Koi Fish Deliveries</h3>
            </div>

            <div className="header-right">
                <div>avatar</div>
            </div>
        </div>
    )
}

export default Header;