import { useState } from 'react';
import './body.scss'; // Import the CSS file
import OrderInfo from './components/OrderInfo';
import ProgressBar from './utils/ProgressBar';
import FishInfo from './components/FishInfo';

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