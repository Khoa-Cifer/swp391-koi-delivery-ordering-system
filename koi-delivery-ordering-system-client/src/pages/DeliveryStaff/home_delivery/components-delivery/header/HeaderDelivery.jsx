import "./Header_delivery.scss"

function HeaderDelivery() {
  return (
    <div className="header-delivery">
          <div className="heaader-delivery-left">
            {/* <div className="logo">
              <img src="src/assets/logo.svg" alt="logo" />
            </div> */}

            <div className="function">
              <button>
                <strong>Order List Page</strong>
              </button>
              <button>
                <strong>Available Order Page</strong>
              </button>
              <button>
                <strong>Update Order Info</strong>
              </button>
              <button>
                <strong>User Page</strong>
              </button>
            </div>
          </div>

          <div className="header-delivery-right">
            {/* <div className="search">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
              />
              <button>Search</button>
            </div> */}

            <div className="logout">
              <button>Log out</button>
            </div>
          </div>
        </div>
  )
}

export default HeaderDelivery;