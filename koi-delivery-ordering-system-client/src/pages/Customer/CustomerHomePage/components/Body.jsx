import { useState } from 'react';
import './body.scss'; // Import the CSS file
import ProgressBar from '../utils/ProgressBar';
import OrderInfo from '../pages/OrderInfo';
import FishInfo from '../pages/FishInfo';

function Body() {
    const [formStep, setFormStep] = useState(0);

    function handleData(e) {
        setFormStep(e);
        console.log(e);
    }

    return (
        <div>
            <ProgressBar />
            <OrderInfo formStep={e => handleData(e)} />
            <FishInfo formStep={e => handleData(e)} />
        </div>
    );
}

export default Body;