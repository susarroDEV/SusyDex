import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PokemonPage } from './pages/PokemonPage'
import { Page404 } from './pages/Page404'

export function App () {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:pokemonName" element={<PokemonPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
  )
}
