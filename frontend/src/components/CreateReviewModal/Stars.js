import { useState, useEffect } from 'react';

const StarRating = ({ stars, disabled, onChange }) => {
  const [activeStars, setActiveStars] = useState();

  // console.log("disabled in StarRating: ", disabled);
  

  useEffect(() => {
    setActiveStars(stars);
  }, [stars]);


  return (
    <>

    <div className="rating-input">
      <div 
        className={activeStars >= 1 ? "filled" : "empty"} 
        >
        <i className="fa-solid fa-star"
          onMouseEnter={() => !disabled ? setActiveStars(1) : setActiveStars(stars)} 
          onMouseLeave={() => !disabled ? setActiveStars(stars) : setActiveStars(stars)}
          onClick={() => onChange(1)}
        ></i>
      </div>
      <div className={activeStars >= 2 ? "filled" : "empty"} >
        <i className="fa-solid fa-star"
          onMouseEnter={() => !disabled ? setActiveStars(2) : setActiveStars(stars)}
          onMouseLeave={() => !disabled ? setActiveStars(stars) : setActiveStars(stars)}
          onClick={() => onChange(2)}
        ></i>
      </div>
      <div className={activeStars >= 3 ? "filled" : "empty"} >
        <i 
        className="fa-solid fa-star"
        onMouseEnter={() => !disabled ? setActiveStars(3) : setActiveStars(stars)}
        onMouseLeave={() => !disabled ? setActiveStars(stars) : setActiveStars(stars)}
        onClick={() => onChange(3)}
        ></i>
      </div>
      <div className={activeStars >= 4 ? "filled" : "empty"} >
        <i 
        className="fa-solid fa-star"
        onMouseEnter={() => !disabled ? setActiveStars(4) : setActiveStars(stars)}
        onMouseLeave={() => !disabled ? setActiveStars(stars) : setActiveStars(stars)}
        onClick={() => onChange(4)}
        ></i>
      </div>
      <div className={activeStars === 5 ? "filled" : "empty"} >
        <i 
        className="fa-solid fa-star"
        onMouseEnter={() => !disabled ? setActiveStars(5) : setActiveStars(stars)}
        onMouseLeave={() => !disabled ?  setActiveStars(stars) : setActiveStars(stars)}
        onClick={() => onChange(5)}
        ></i>
      </div>
    </div>
    </>
   
  );
};

export default StarRating;
