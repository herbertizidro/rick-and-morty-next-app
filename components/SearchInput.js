import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SearchInput.module.css'

export default function SearchInput(props) {
  const {search, onChangeFunc, onClickFunc, placeholder, buttonText} = props
  return (
	<div id="input-search">
		<input type="text" className="form-control rounded-0" placeholder={placeholder ? placeholder : ''} value={search} onChange={onChangeFunc}/>
		<button type="button" style={{backgroundColor: "#70aa46", borderColor: "#70aa46"}} className="btn btn-success rounded-0" onClick={onClickFunc}>{buttonText}</button>
	</div>
  )
}

/* checagem de props */
SearchInput.propTypes = {
  search: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string.isRequired,	
  onChangeFunc: PropTypes.func.isRequired,
  onClickFunc: PropTypes.func.isRequired
}
