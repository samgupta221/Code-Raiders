import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

const FeaturedItems = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredItems] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      size: "Medium",
      condition: "Excellent",
      points: 150,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      owner: "Sarah M."
    },
    {
      id: 2,
      title: "Designer Silk Blouse",
      size: "Small",
      condition: "Like New",
      points: 200,
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=300&fit=crop",
      owner: "Emma K."
    },
    {
      id: 3,
      title: "Leather Boots",
      size: "9",
      condition: "Good",
      points: 175,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      owner: "Alex R."
    },
    {
      id: 4,
      title: "Wool Sweater",
      size: "Large",
      condition: "Very Good",
      points: 125,
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=300&h=300&fit=crop",
      owner: "Mike T."
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredItems.length]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === featuredItems.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? featuredItems.length - 1 : currentIndex - 1);
  };

  return (
    <section className="featured-items">
      <div className="container">
        <h2>Featured Items</h2>
        <p>Discover amazing items from our community</p>
        
        <div className="carousel-container">
          <button className="carousel-btn carousel-btn--prev" onClick={prevSlide}>
            &#8249;
          </button>
          
          <div className="carousel-wrapper">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="carousel-slide">
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
          
          <button className="carousel-btn carousel-btn--next" onClick={nextSlide}>
            &#8250;
          </button>
        </div>
        
        <div className="carousel-indicators">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
