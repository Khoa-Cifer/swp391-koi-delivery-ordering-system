import { useState } from 'react';

const StarRating = () => {
    const [rating, setRating] = useState(0); // State to store the selected rating
    const [hover, setHover] = useState(0); // State to track hover over stars

    const handleClick = (index) => {
        setRating(index); // Set rating when a star is clicked
    };

    const handleMouseEnter = (index) => {
        setHover(index); // Update hover state on mouse enter
    };

    const handleMouseLeave = () => {
        setHover(0); // Reset hover state on mouse leave
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star, index) => (
                <span
                    key={index}
                    style={{
                        fontSize: '2rem',
                        cursor: 'pointer',
                        color: hover >= star || rating >= star ? 'gold' : 'gray',
                    }}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                >
                    ★
                </span>
            ))}
            <p>Selected Rating: {rating}</p>
        </div>
    );
};

export default StarRating;
