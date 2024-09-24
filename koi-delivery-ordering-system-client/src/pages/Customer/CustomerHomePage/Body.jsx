import { useState } from 'react';
import './body.scss'; // Import the CSS file
import FishInfo from './components/FishInfo';
import OrderInfo from './components/OrderInfo';
import ProgressBar from './utils/ProgressBar';

function Body() {
    const [formState, setFormState] = useState(1);

    const handleData = (data) => {
        setFormState(data); // Logs "Test"
    };

    return (
        <div>
            <ProgressBar />
            {formState === 1 && (
                <OrderInfo formStep={handleData} />
            )}
            {formState === 2 && (
                <FishInfo formStep={handleData} />
            )}
        </div>
    );
}

export default Body;