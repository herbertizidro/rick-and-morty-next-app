import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import Card from '../components/Card'
import SearchInput from '../components/SearchInput'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



const Home = (props) => {
	
   const inputRef = useRef('')	//evitar renderizações desnecessárias
   const [searchObj, setSearchObj] = useState(null);
   const [isLoading, setLoading] = useState(false);
   const startLoading = () => setLoading(true);
   const stopLoading = () => setLoading(false);
	
    
    //configuração de navegação
    useEffect(() => {
        
	Router.events.on('routeChangeStart', startLoading); 
        Router.events.on('routeChangeComplete', stopLoading);
    
        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
		
    }, [])
	
	//após a requisição ser concluída, scrolla pros resultados
    useEffect(() => {
        
	function scrollToDiv () { 
		let scroll_div = document.getElementById("wrapper-cards");
		scroll_div.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})
	}

	if(searchObj) scrollToDiv();
		
    }, [searchObj])
	
	//paginação
    const pagginationHandler = (page) => {
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
			if(inputRef.current){
				const api = "https://rickandmortyapi.com/api/character/?name=" + inputRef.current
				const response = await fetch(api)
				const responseStatus = response.status;
				if(responseStatus == 200){
					const data = await response.json()
					setSearchObj(data.results)
				}else if(responseStatus == 404){
					alert("No results found for your search.")
				}else{
					alert("Oops! Could not complete your search.")
				}
			}
		}catch(e){
			console.log(e.message)
			alert("An internal error has occurred. Try again later.")
		}
	}
	
	// atualiza o input value e reseta os estados relacionados à busca
	const inputUpdate = (e) => {
		inputRef.current = e.target.value;
		setSearchObj(null)
	}
	
	
	//renderização condicional dos cards de acordo com a busca
    let content = null;
    if (isLoading){
        content = <div id="loader-full-screen"><div id="loader"><h5>Please, wait a moment ...</h5></div></div>
    }else {
		
		if(searchObj){ //usuário decidiu pesquisar por um personagem
			content = (
				<>
				    {searchObj.map((item, index) => {
								return <Card key={index} id={item.id} name={item.name} species={item.species} image={item.image} />						                   
				    })}
				</>
			);
		}else{ 
			content = (
				<>
				    {props.props.items.map((item, index) => {
					return <Card key={index} id={item.id} name={item.name} species={item.species} image={item.image} />
				    })}
				</>
			);
		}
    }
    
    return (
		<>	
			<div className={styles.search_container}>
				<SearchInput value={inputRef.current} onChangeFunc={(e) => inputUpdate(e)} onClickFunc={() => getCharacterByName()} placeholder="Search characters" buttonText="Search" />
			</div>

			<br/><br/>
			
			<div className={styles.generic_container}>
				{!searchObj && <h6>all characters</h6>}
			</div><br/>
			
            		<div id="wrapper-cards" className={styles.generic_container}>
				{content}            
			</div>
			
			<br/><br/>
			
			{!searchObj && (
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
							pageCount={props.props.totalPages}
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
	const api = "https://rickandmortyapi.com/api"	
	const res = await fetch(`${api}/character?page=${page}`)
	const data = await res.json()
	  
	return {
		props: {
			items: data.results,
			totalPages: data.info.pages
		}
	}
}



export default withRouter(Home);
