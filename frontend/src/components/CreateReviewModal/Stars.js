import { useState } from 'react';
import './CreateReview.css'

const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <>
        <h1>How was your stay?</h1>
        <textarea placeholder="Leave your review here..."></textarea>
        <div className='star-rating'>
            {[...Array(5)].map((star) => {
                index += 1;
                return (
                    <button
                    type='button'
                    key={index}
                    className={index <= rating ? 'on' : 'off'}
                    onClick={() => setRating(index)}
                    onMouseEnter={()=> setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                    onDoubleClick={() => {setRating(0); setHover(0)}}
                    >
                    <span className='star'><i className="fa-solid fa-star"></i></span>
                    </button>
                );
            })};
        </div>
        </>
    )
}

export default StarRating;