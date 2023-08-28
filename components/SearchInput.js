import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SearchInput.module.css'

export default function SearchInput(props) {
  const {value, onChange, onClick, placeholder, buttonText} = props;
  return (
	<div id="input-search">
		<input type="text" className="form-control rounded-0" placeholder={placeholder || ''} value={value} onChange={onChange}/>
		<button type="button" style={{backgroundColor: "#70aa46", borderColor: "#70aa46"}} className="btn btn-success rounded-0" onClick={onClick}>{buttonText}</button>
	</div>
  )
};

SearchInput.defaultProps = {
  value: '',
  placeholder: '',
};

SearchInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string.isRequired,	
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
