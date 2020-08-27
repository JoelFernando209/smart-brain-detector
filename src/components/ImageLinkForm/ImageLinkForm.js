import React from 'react';
import './ImageLinkForm.css';
import 'tachyons';

const ImageLinkForm = ({ onInputChange, onClick }) => {
  return (
    <div>
      <p className="f3 tc">
        {'This Magic Brain will detect faces in your pictures... Give it a try!'}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5 tc">
          <input className="f3 pa2 dib w-70 center" type="text" onChange={onInputChange} />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple shadow-0" onClick={onClick}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;