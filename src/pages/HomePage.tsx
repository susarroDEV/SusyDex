import { FilterProvider } from '../context/filters'
import { Header } from '../components/Header'
import { Filters } from '../components/Filters'
import { Pokedex } from '../components/Pokedex'
import { Footer } from '../components/Footer'

import './HomePage.css'

export function HomePage () {
  return (
        <FilterProvider>
            <div className='container'>
                <Header/>
                <Filters/>
                <Pokedex/>
                <Footer/>
            </div>
        </FilterProvider>
  )
}
