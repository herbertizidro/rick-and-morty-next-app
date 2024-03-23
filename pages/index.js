import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import Card from '../components/Card'
import SearchInput from '../components/SearchInput'
import styles from '../styles/Home.module.css'



const Home = props => {
	
	const [inputValue, setInputValue] = useState();
	const [results, setResults] = useState();
	const [isLoading, setLoading] = useState(false);
	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);
	    
	useEffect(() => {
		Router.events.on('routeChangeStart', startLoading()); 
	        Router.events.on('routeChangeComplete', stopLoading());
	        return () => {
	            Router.events.off('routeChangeStart', startLoading());
	            Router.events.off('routeChangeComplete', stopLoading());
	        }		
	}, []);
		
	// após a requisição ser concluída, scrolla pros resultados
	 useEffect(() => {
		function scrollToDiv () { 
			let scroll_div = document.getElementById("wrapper-cards");
			scroll_div.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'});
		}
	
		if(results?.length) scrollToDiv();
	}, [results])
		
	// paginação
	const pagginationHandler = page => {
		const currentPath = props.router.pathname;
	        const currentQuery = props.router.query;
	        currentQuery.page = page.selected + 1;
	    
		props.router.push({
	            pathname: currentPath,
	            query: currentQuery,
	        });
	    
	};
		
	// se o usuário quiser pesquisar por um personagem
	async function getCharacterByName() {
		try{
			if(!inputValue) return;		
			const api = "https://rickandmortyapi.com/api/character/?name=" + inputValue;
			const response = await fetch(api);
			const responseStatus = response.status;
			const data = await response.json();
			if(responseStatus === 200){
				setResults(data?.results);
			}else if(responseStatus === 404){
				alert("No results found for your search.")
			}else{
				alert("Oops! Could not complete your search.")
			}		
		}catch(e){
			console.log(e.message)
			alert("An internal error has occurred. Try again later.")
		}
	}
		
		
	// atualiza o input value e reseta a busca
	const updateInput = e => {
		if (results?.length) setResults();
		setInputValue(e.target.value);
	};
	
		
	// renderização condicional dos cards de acordo com a busca
	const cardsList = () => {
		if (results?.length) return results.map(item => <Card key={item.id} id={item.id} name={item.name} species={item.species} image={item.image} />);
		return props.data.items?.map(item => <Card key={item.id} id={item.id} name={item.name} species={item.species} image={item.image} />)
	}
	
	return (
		<>	
		<div className={styles.search_container}>
			<SearchInput 
				value={inputValue} 
				onChange={e => updateInput(e)} 
				onClick={() => getCharacterByName()} 
				placeholder="Search characters" 
				buttonText="Search" 
			/>
		</div>
		<div className={styles.generic_container}>{!results && <h6>all characters</h6>}</div>
		
	        <div id="wrapper-cards" className={styles.generic_container}>{isLoading ? (
			<div id="loader-full-screen"><div id="loader"><h5>Please, wait a moment ...</h5></div></div>		
		) : cardsList }</div>	
	
		{!results && (
			<div id="paginate">
				<ReactPaginate
					previousLabel={'Previous'}
					nextLabel={'Next'}
					breakLabel={'...'}
					breakClassName={'break-me'}
					activeClassName={'active'}
					containerClassName={'pagination'}
					subContainerClassName={'pages pagination'}    
					initialPage={props.router.query.page ? parseInt(props.router.query.page) - 1 : 0}
					pageCount={props.data.totalPages}
					pageRangeDisplayed={4}
					onPageChange={pagginationHandler}
					renderOnZeroPageCount={null}
				/>
			</div>
		)}
		</>
	);
	
}


Home.getInitialProps = async ({ query }) => {
	const page = query.page || 1;
	const api = "https://rickandmortyapi.com/api";
	const res = await fetch(`${api}/character?page=${page}`);
	const data = await res.json();
	return {
		data: {
			items: data?.results,
			totalPages: data?.info?.pages
		}
	}
}


export default withRouter(Home);
