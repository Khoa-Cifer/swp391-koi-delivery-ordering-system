import "./delivery_staff.scss";

function Delivery_staff() {
  return (
    <div className="background-container">
      <div className="background" >
        <div className="header-left">
          <div className="logo">Logo</div>

          <div>
            <div className="order-list-page">
              <button>Order List Page</button>
            </div>

            <div className="available-order-page">
              <button>Available Order Page</button>
            </div>

            <div className="update-order-info">
              <button>Update Order Info</button>
            </div>

            <div className="user-page">
              <button>User Page</button>
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
                <button>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery_staff;



