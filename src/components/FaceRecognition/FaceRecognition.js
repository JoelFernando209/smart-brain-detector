import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes, onSecretChange, onSecretClick }) => {
  return (
    <div className="center ma pa2">
      <div style={{position: "relative"}}>
        <img className="center" id="inputimage" alt="" src={imageUrl} width='500px' height='auto' />
        {
          boxes.map((box, i) => {
            const { topRow, leftCol, rightCol, bottomRow } = box;
            return (<div key={i} id="face" className="bounding-box" style={{top: topRow, left: leftCol, right: rightCol, bottom: bottomRow}}></div>);
          })
        }
        
        <div className="mt4 tc">
          <label htmlFor="secret">Search a Secret!</label><br />
          <input style={{width: '450px'}} type="text" name="secret" onChange={onSecretChange} placeholder="Chase: No Chases hahaha!" className="b--black"/>
          <button className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib" onClick={onSecretClick}>Verify</button>
        </div>
        </div>
    
    </div>
  )
}

export default FaceRecognition;