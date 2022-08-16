import React from 'react';
import styles from '../styles/SearchInput.module.css'

export default function SearchInput(props) {
  const {search, onChangeFunc, onClickFunc} = props
  return (
	<div id="input-search">
		<input type="text" className="form-control rounded-0" placeholder="Search for a character" value={search} onChange={onChangeFunc}/>
		<button type="button" style={{backgroundColor: "#70aa46", borderColor: "#70aa46"}} className="btn btn-success rounded-0" onClick={onClickFunc}>Search</button>
	</div>
  )
}
