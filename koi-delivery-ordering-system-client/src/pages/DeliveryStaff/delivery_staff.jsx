import "./delivery_staff.scss";

function DeliveryStaff() {
  return (
    <div className="background-container">
      <img src="https://www.monigroup.com/sites/moni/files/2018-06/ecommerce-delivery.jpg" alt="background" />

      <div className="background">
        <div className="header">
          <div className="heaader-left">
            {/* <div className="logo">
              <img src="src/assets/logo.svg" alt="logo" />
            </div> */}

            <div className="function">
              <button><strong>Order List Page</strong></button>
              <button><strong>Available Order Page</strong></button>
              <button><strong>Update Order Info</strong></button>
              <button><strong>User Page</strong></button>
            </div>
          </div>

          <div className="header-right">
            <div className="search">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
              />
              <button>Search</button>
            </div>

            <div className="logout">
              <button>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryStaff;
