import "./footer.scss";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <h2>
            We are committed to removing barriers of cross-border e-commerce.
          </h2>
        </div>

        <div className="footer-content">
          <div className="footer-column">
            <h4>Address</h4>
            <p>
              〒136-0075 Tokyo, Koto, Shinsuna, 3 Chome-10-8, 1F Warehouse 3
            </p>
            <h4>Email</h4>
            <p>
              Direct to CEO:{" "}
              <a href="mailto:chienlv@ezbuy.jp">chienlv@ezbuy.jp</a>
            </p>
          </div>

          <div className="footer-column">
            <h4>Connect us</h4>
            <p>Connect with us across social networks</p>
            <div className="social-icons">
              <a href="#"></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#">Cross-border Shipping</a>
              </li>

              <li>
                <a href="#">Air Freight & Customs Clearance</a>
              </li>

              <li>
                <a href="#">Sell in Japan</a>
              </li>
              <li>
                <a href="#">Dropshipping Solution</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Shipping</h4>
            <ul>
              <li>
                <a href="#">Create a Shipment</a>
              </li>
              <li>
                <a href="#">Track & Trace</a>
              </li>
              <li>
                <a href="#">Rates and Transit times</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Ezbuy Japan 2023 - Premium eCommerce Solutions</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
