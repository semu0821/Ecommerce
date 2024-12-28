import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid bg-white">
        <div className="row ">
          <div className="col-md-9 py-3 text-white">
           
          </div>
          <div className="col-md-3 py-3 text-center text-dark">
            <Link to="/" title="Apple">
              <i className="bi bi-apple text-dark me-3"></i>
            </Link>
            <Link to="/" title="Windows">
              <i className="bi bi-windows text-dark me-3"></i>
            </Link>
            <Link to="/" title="Android">
              <i className="bi bi-android2 text-dark me-3"></i>
            </Link>
            |
            <Link to="/" title="Twitter">
              <i className="bi bi-twitter-x text-dark ms-3 me-3"></i>
            </Link>
            <Link to="/" title="Facebook">
              <i className="bi bi-facebook text-dark me-3"></i>
            </Link>
            <Link to="/" title="Instagram">
              <i className="bi bi-instagram text-dark me-3"></i>
            </Link>
            <Link to="/" title="Youtube">
              <i className="bi bi-youtube text-dark me-3"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white">
        <div className="row ">
          <div className="col-md-3 py-3">
            <div className="h6">Company Name</div>
            <hr />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Products</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Electronics
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Mobiles
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Car & bike
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Super Market
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Travel Cards
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Policy</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Return Policy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Terms Of Use
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Security
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  Privacy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link
                  to="/"
                  className="text-decoration-none text-white stretched-link"
                >
                  EPR Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Address</div>
            <hr />
            <address>
              <strong>Twitter, Inc.</strong>
              <br />
              1355 Market St, Suite 900
              <br />
              San Francisco, CA 94103
              <br />
              <abbr title="Phone">P:</abbr> (123) 456-7890
            </address>
            <div className="h6">Customer Care</div>
            <hr />
            <i className="bi bi-telephone"></i> +1800 100 1000
            <br />
            <i className="bi bi-envelope"></i> info@email.com
          </div>
        </div>
      </div>
     
       
      
    </footer>
  );
};
export default Footer;
