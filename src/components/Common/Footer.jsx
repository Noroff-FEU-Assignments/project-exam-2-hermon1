import { useContext } from "react";
import { Nav } from "react-bootstrap"
import AuthContext from "../../context/AuthContext";


export default function Footer() {
    const [auth] = useContext(AuthContext);


  return (
    <footer>
      <div className="footer_menu">
        <Nav>
          {auth ? (
            <>
              <div>
                <Nav.Link href="/">Home</Nav.Link>
          
              </div>
             
            </>
          )
            : (
              <Nav.Link href="/">Login</Nav.Link>
            )
          }
        </Nav>
      </div>
      <div className="footer_info">
        <a href="/" className="navbar-brand"> Anti Social Social Media App</a>
        <h6>Created by Hermon Tesfay</h6>
      </div>
    </footer>
  )
}