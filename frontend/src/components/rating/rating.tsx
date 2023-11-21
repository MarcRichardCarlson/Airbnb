import React, { useState, useEffect } from 'react';

const Rating = () => {
  const [randomRating, setRandomRating] = useState(generateRandomRating());

  useEffect(() => {
    // Generate a new random rating when the component mounts
    setRandomRating(generateRandomRating());
  }, []); // The empty dependency array ensures that this effect runs only once

  function generateRandomRating() {
    const numberOfStars = Math.floor(Math.random() * 5) + 1; // Generate a random number between 1 and 5
    return '⭐'.repeat(numberOfStars); // Repeat the star character based on the random number
  }

  return (
    <div className="absolute bottom-0 right-0">
      {randomRating}
    </div>
  );
};

export default Rating;
