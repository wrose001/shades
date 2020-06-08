import React, { useState, useEffect } from "react";
import "../App.css";


const Stars = ({ rating, newReview, changeRating }) => {

    const [newRating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [hovering, setHovering] = useState(false);
    const stars = [1, 2, 3, 4, 5];

    useEffect(() => {
        if (!newReview) {
            setRating(rating);
        }

    })

    const getClassName = (index) => {
        if (hovering) {
            return (hoverRating && hoverRating >= index) ? "star-rating-filled" : "star-rating-blank"
        }

        return (newRating && newRating >= index) ? "star-rating-filled" : "star-rating-blank"

    }

    const handleHover = (index) => {
        setHovering(index !== 0);
        setHoverRating(index)
    }

    const handleNewRating = (rating) => {
        setRating(rating);
        changeRating(rating);
    }

    return (
        stars.map((star) => {
            return (
                <div
                    className="col"
                    onMouseEnter={() => (newReview) ? handleHover(star) : null}
                    onMouseLeave={() => (newReview) ? handleHover(0) : null}
                    onClick={() => (newReview) ? handleNewRating(hoverRating) : null}
                >
                    <svg
                        className={getClassName(star)}
                        viewBox="0 0 25 23"
                        data-rating={newRating}
                    >
                        <polygon
                            strokeWidth="0"
                            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                        />
                    </svg>
                </div>
            )
        })
    );
};

export default Stars