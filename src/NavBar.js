import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/welcome">Home</Nav.Link>
            <Nav.Link href="/groupChat">Group Chat</Nav.Link>
            <Nav.Link href="/manageUsers">Manager Users</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavBar;