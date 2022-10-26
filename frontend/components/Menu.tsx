
import Image from 'next/image';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import lotteryImg from "../images/lottery.png"
import { ConnectButton } from '@rainbow-me/rainbowkit';

function NavBar() {

  return (
    <Navbar  fixed="top" variant= 'dark' expand="lg">
        
        
      <Container fluid>
        <Navbar.Brand   >EnLotto
       
        <Link href="https://www.flaticon.com/free-icons/lottery" title="lottery icons">
        <Image 
        src={lotteryImg}
        alt='f'
        width={20}
        height={20}
        >
        </Image></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className='justify-content-center' id="navbarScroll">
          <Nav
            className=" my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" ><button className='btn btn-dark fw-bold'>Home</button></Nav.Link>
            <Nav.Link href="/token" ><button className='btn btn-dark fw-bold'>Token</button></Nav.Link>
            <Nav.Link href="/lotto" ><button className='btn btn-dark fw-bold'>Lottery</button></Nav.Link>
            
            <div>
            <button className='btn '>
            <NavDropdown title="Source" className='fw-bold' id="navbarScrollingDropdown" >
            
              <NavDropdown.Item href="https://github.com/protocolwhisper" target='blank'>ProtocolWhisper</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/joaovwfreire" target='blank'>
                JoVi
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/protocolwhisper/LotteryDapp" target='blank'>
                This project`s repo.
              </NavDropdown.Item>
            </NavDropdown>
            </button>
            </div>
            <div className="pt-2">
            <ConnectButton/>
            </div>
          </Nav>
         
          

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;