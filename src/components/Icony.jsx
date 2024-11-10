import React from 'react';
import armadillo from '../assets/armadillo.png';  // Make sure the image path is correct

const Icony = () => (
  <div className="w-12 h-12">
    <img 
      src={armadillo} 
      alt="ArmaDollar Saver Mascot" 
      className="w-full h-full object-contain" 
    />
  </div>
);

export default Icony;
