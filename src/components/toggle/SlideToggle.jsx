import React from 'react';
import './SlideToggle.scss';

const SlideToggle = props => (
  <div className="slider">
    <div>
      <label>{props.label}</label>
    </div>
    <label className="switch">
      <input
        id={props.id}
        type="checkbox"
        className="form-control"
        checked={props.value}
        onChange={props.onChange}
      />
      <span className="slider round" />
    </label>
  </div>
);

export default SlideToggle;
