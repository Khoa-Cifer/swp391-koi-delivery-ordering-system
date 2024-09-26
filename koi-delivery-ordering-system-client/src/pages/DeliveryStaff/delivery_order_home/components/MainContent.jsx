import "./MainContent.scss";
import cards from "./Cards.jsx";
const MainContent = () => {
  return (
    <div className="container">
      <div className="map-container">
        <p>Google Map</p>
      </div>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <p>Name:{card.name}</p>
            <p>Current Page - Last Updated Date:{card.currentpage}</p>
            <p>Destination Address: {card.address}</p>
            <div className="button-container">
              <button className="status-button">Order Status</button>
              <button className="detail-button">Detail</button>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more-container">
        <button className="view-more-button">View More</button>
      </div>
    </div>
  );
};

export default MainContent;
