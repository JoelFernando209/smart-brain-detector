import React from 'react';

const Secret = ({ onRouteChange }) => {
  return (
    <div className="tc">
      <h2 className="f1 center mt5">You found the Secret Route!</h2>
      <h4>Here... Take a cookie!</h4>
      <img src="https://lh3.googleusercontent.com/proxy/3KybTHsFPuqAW90y_ktZ1KE7jyuVQmdpy84Svfpjc5xKM3708yRpStlxdEpp2mnREoYvNQylkieQbYBZgS-a1LmrL1koz1yD8UZ1o74nZ43GIf3ie8K2HwRAFC9Amit1" alt=""/>
      <p className="pointer grow" onClick={() => onRouteChange('signin')}>Go back to Sign In</p>
    </div>
  )
}

export default Secret;