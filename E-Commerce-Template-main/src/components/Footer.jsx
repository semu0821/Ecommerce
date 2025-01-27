import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="container-fluid"
      style={{
        background: "linear-gradient(white)", // Gradient for the entire footer background
      }}
    >
      <div className="row">
        {/* Social Media Section - No background change */}
        <div className="col-md-9 py-3 text-white">
          {/* This section can be left empty or customized further */}
        </div>
        {/* <div className="col-md-3 py-3 text-center text-dark">
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
        </div> */}
      </div>

      {/* Footer Content Section with different background */}
      <div
        className="container-fluid text-white"
        style={{
          background: "linear-gradient(to right, rgb(0, 7, 8), rgb(42, 198, 242))", // Set a solid background color for the footer content section
        }}
      >
        <div className="row">
          <div className="col-md-3 py-3">
            <div className="h6">Company Name</div>
            <hr />
            <p>
              This e-commerce company has been at the forefront of online retail,
              offering a wide range of products to customers globally. With a
              commitment to innovation and exceptional customer service, it continues
              to set the standard for the industry, evolving since its inception to
              meet the dynamic needs of a digital world.
            </p>
          </div>

          {/* Products Section */}
          {/* <div className="col-md-3 py-3">
            <div className="h6">Products</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-dark">
                <Link to="/" className="text-decoration-none text-white stretched-link">
                  Clothes
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link to="/" className="text-decoration-none text-white stretched-link">
                  Home Accessories
                </Link>
              </li>
             
            </ul>
          </div> */}

          {/* Policy Section */}
          {/* <div className="col-md-3 py-3">
            <div className="h6">Policy</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-dark">
                <Link to="/" className="text-decoration-none text-white stretched-link">
                  Return Policy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link to="/" className="text-decoration-none text-white stretched-link">
                  Terms Of Use
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link to="/" className="text-decoration-none text-white stretched-link">
                  Security
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link to="/" className="text-decoration-none text-white stretched-link">
                  Privacy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-dark">
                <Link to="/" className="text-decoration-none text-white ">
                  EPR Compliance
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Address and Customer Care Section */}
          {/* <div className="col-md-3 py-3">
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
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
