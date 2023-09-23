import styles from '../../styles/Character.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'



export const getStaticPaths = async () => {
  
  //gerar os ids para os 100 primeiros personagens
  const paths = [];
  
  for (let i = 1; i < 101; i++) {
   paths.push({
      params: { itemId: (i).toString() },
    })
  }
  
  return {
    paths,
    fallback: true, //false - se tentar acessar um id fora do paths vai receber um 404
  }
}

//pré-processamento(gerar páginas estáticas)
export const getStaticProps = async (context) => {
 
  const id = context.params.itemId //para acessar os ids gerados em getStaticPaths
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
  const data = await res.json()

  return {
    props: { characters: data }, 
	  //revalidate: 10, - quando é necessário atualizar informação das páginas estáticas
	  //O valor "10" significa 10 segundos de intervalo até que as páginas sejam pré-processadas novamente
	  //o fallback do getStaticPaths deve ser true ou blocking nesse caso
  }
}


export default function Character(props) {

 // loading full screen
  const router = useRouter()
  if(router.isFallback){
	  return(
		<div id="loader-full-screen"><div id="loader"><h5>Please, wait a moment ...</h5></div></div>
	  )
  }
  
  return (
    <div className={styles.character_container}>
      	<h1 className={styles.title}>{props.characters.name}</h1>
	<br/>

	<Image 
            src={props.characters.image}
            width="200"
            height="200"
            alt={props.characters.name}
	    className={styles.img_border}
	/>
	<br/><br/>
 
       <div>
        	<span><b>Specie:</b> {props.characters.species || "---"}</span><br/>
        	<span><b>Status:</b> {props.characters.status || "---"}</span><br/>
		<span><b>Origin:</b> {props.characters.origin.name || "---"}</span><br/>
		<span><b>Location:</b> {props.characters.location.name || "---"}</span>
       </div>
    </div>
  )
}

