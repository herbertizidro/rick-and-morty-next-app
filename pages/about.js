import Image from 'next/image'
import styles from '../styles/About.module.css'

// conteúdo da página "Sobre"
export default function About() {
  return (
    <div className={styles.about}>
      <h1>About</h1><br/>
	  <Image src="/images/ram.png" width="300" height="400" alt="Rick And Morty Wallpaper" />
	  <br/><br/><br/>
	  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, of a when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
	</div>
  )
}