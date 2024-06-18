import { Link, Outlet } from 'react-router-dom';

function Nav(props) {
    return (<><nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#6c757d !important"}}>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Dashboard</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/welcome">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/groupChat">Group Chat</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/manageUsers">Manage Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/manageDocument">Manage Document</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        <div className="container">
            <Outlet />
        </div>
    </>);
}

export default Nav;