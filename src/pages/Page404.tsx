import { Link } from 'react-router-dom'

import './Page404.css'

export function Page404 () {
  return (
        <section className="pk404-container">
            <div className="pk404-title">
                <h1>404</h1>
                <h2>PAGE NOT FOUND</h2>
            </div>
            <Link to="/" className="pk404-link">
                <h3>Go back!</h3>
                <img src="../../assets/PikachuRunning.gif" alt="A gif of a Pikachu Running" />
            </Link>
        </section>
  )
}
