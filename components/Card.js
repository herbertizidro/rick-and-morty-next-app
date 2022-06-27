import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/Card.module.css'

export default function Card(props) {

  const {species, id, name, image} = props

  return (
    <div className={styles.card}>
		<div className="character-name"><span>{name}</span></div>
		<Link href={`./character/${id}`}>
			<Image 
				src={image}
				width="220"
				height="220"
				alt={name}
			/>
		</Link>
		<div className="character-info">
			<div>
				<span>#{id}</span>
			</div>
			<div>
				<span>{species}</span>
			</div>
		</div>
		
    </div>
  )
}

