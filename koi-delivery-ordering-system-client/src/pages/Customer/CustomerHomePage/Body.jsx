import './body.scss'; // Import the CSS file
import OrderInfo from './components/OrderInfo';
import ProgressBar from './utils/ProgressBar';

function Body() {
    return (
        <div>
            <ProgressBar />
            <OrderInfo />
        </div>
    );
}

export default Body;