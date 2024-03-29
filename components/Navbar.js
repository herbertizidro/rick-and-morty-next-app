import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
		<div className={styles.logo}>
			<Link href="/?page=1"><h4><span>RickAndMorty</span> Challenge</h4></Link>
		</div>
		<ul className={styles.link_items}>
			<li>
				<Link href="/about"><a>About</a></Link>
			</li>
		</ul>
    </nav>
  )
}
