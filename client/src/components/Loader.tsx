import React from 'react';
import './Loader.css'; // You can define your styles for the loader here

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 80, color = '#007bff' }) => {
  const loaderStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderColor: `${color} transparent transparent transparent`,
  };

  return (
    <div className="loader-container">
      <div className="loader" style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
