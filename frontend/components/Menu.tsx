import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Account from './Account';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useEagerConnect from "../hooks/useEagerConnect";
import lotteryImg from "../images/lottery.png"

function NavBar() {
    const triedToEagerConnect = useEagerConnect();
  return (
    <Navbar className = "navColor" fixed="top" variant= 'dark' expand="lg">
        
        
      <Container fluid>
        <Navbar.Brand href="#" >EnLotto
       
        <a href="https://www.flaticon.com/free-icons/lottery" title="lottery icons">
        <Image 
        src={lotteryImg}
        alt='f'
     
        width={20}
        height={20}
        >
        </Image></a></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" className='justify-content-center'>Home</Nav.Link>
            <Nav.Link href="/token" className='justify-content-center'>Token</Nav.Link>
            <Nav.Link href="/lotto" className='justify-content-center'>Lottery</Nav.Link>
            <NavDropdown title="Source" id="navbarScrollingDropdown" className='justify-content-center'>
              <NavDropdown.Item href="https://github.com/protocolwhisper" target='blank'>ProtocolWhisper</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/joaovwfreire" target='blank'>
                JoVi
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/protocolwhisper/LotteryDapp" target='blank'>
                This project`s repo.
              </NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
         
          

          <Account triedToEagerConnect={triedToEagerConnect} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;