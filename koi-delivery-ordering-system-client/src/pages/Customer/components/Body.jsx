import { useState } from 'react';
import './body.scss'; // Import the CSS file
import ProgressBar from '../utils/ProgressBar';
import OrderInfo from '../pages/OrderInfo';
import FishInfo from '../pages/FishInfo';

function Body() {
    const [formStep, setFormStep] = useState(1);
    const [generalData, setGeneralData] = useState({});

    function handleData(e) {
        setFormStep(e);
        console.log(e);
    }

    function handleGeneralData(e) {
        setGeneralData(e);
        console.log(e);
    }

    return (
        <div style={{ margin: "auto" }}>
            <ProgressBar currentStep={formStep}/>
            {formStep === 1 && (
                <OrderInfo formStep={e => handleData(e)} orderGeneralData={e => handleGeneralData(e)} />
            )}
            {formStep === 2 && (
                <FishInfo formStep={e => handleData(e)} />
            )}
        </div>
    );
}

export default Body;