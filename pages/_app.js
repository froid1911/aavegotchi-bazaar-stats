import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <div>
            <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Aavegotchi Stats</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Staking</Nav.Link>
        <Nav.Link href="/bazaar">Bazaar</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    <Container>
            <Component {...pageProps} />
            </Container>
        </div>
}

export default MyApp
