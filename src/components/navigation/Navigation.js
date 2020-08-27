import React from 'react';

const Navigation = ({ onRouteChange }) => {
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange('signin')} className="f3 link dim black h1 underline pr3 pointer">Sign Out</p>
    </nav>
  )
}

export default Navigation;