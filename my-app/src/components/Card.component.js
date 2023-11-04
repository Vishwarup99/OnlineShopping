import React from 'react';

const Card = ({ item, className }) => {
  return (
    <div className={className}>
      <img src={item.images[0]} alt="Card Image" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.description}</p>
      </div>
    </div>
  );
};

export default Card;
