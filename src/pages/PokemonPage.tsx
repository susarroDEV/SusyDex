import { useObtainSinglePokemonInfo } from '../hooks/useObtainSinglePokemonInfo'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { LoadingScreen } from '../components/LoadingScreen'
import { Footer } from '../components/Footer'

import './PokemonPage.css'
import { useObtainSingleVariationInfo } from '../hooks/useObtainSingleVariationInfo'

export function PokemonPage () {
  const { pokemonName = '' } = useParams()
  const pokemonInfo = useObtainSinglePokemonInfo(pokemonName)
  const variationInfo = useObtainSingleVariationInfo(pokemonName)
  const [renderCharacteristics, setRenderCharacteristics] = useState({
    isShiny: false,
    is3D: false
  })

  const handleShiny = () => {
    setRenderCharacteristics({
      ...renderCharacteristics,
      isShiny: !renderCharacteristics.isShiny
    })
  }

  const handle3D = () => {
    setRenderCharacteristics({
      ...renderCharacteristics,
      is3D: !renderCharacteristics.is3D
    })
  }

  if (pokemonInfo === null || pokemonInfo === undefined) {
    return <LoadingScreen/>
  } else {
    return (
            <div className='container'>
                <header>
                    <div className="pki-logo">
                        <img src="../../assets/LogoDex.png" alt="A Pokeball image" />
                        <h1>SusyDex</h1>
                    </div>
                </header>
                <section className='pki-container'>
                    <h1>{pokemonInfo.displayName.toUpperCase()} - #{pokemonInfo.id}</h1>
                    <article className={`pki-img-container  ${renderCharacteristics.is3D ? 'pki-img-container-3D-active' : ''}`}>
                        <img src={pokemonInfo.sprite} alt={`The Sprite of ${pokemonInfo.name}`} className={(!renderCharacteristics.isShiny && !renderCharacteristics.is3D) ? '' : 'pki-img-disabled'} style={{ width: '10vw' }}/>
                        <img src={pokemonInfo.shinySprite} alt={`The Shiny Sprite of ${pokemonInfo.name}`} className={(renderCharacteristics.isShiny && !renderCharacteristics.is3D) ? 'pki-img-container-shiny-active' : 'pki-img-disabled'} style={{ width: '10vw' }}/>
                        <img src={pokemonInfo.model3D} alt={`The 3D Model of ${pokemonInfo.name}`} className={(!renderCharacteristics.isShiny && renderCharacteristics.is3D) ? '' : 'pki-img-disabled'} style={{ transform: 'scale(2)' }}/>
                        <img src={pokemonInfo.shinyModel3D} alt={`The Shiny 3D Model of ${pokemonInfo.name}`} className={(renderCharacteristics.isShiny && renderCharacteristics.is3D) ? 'pki-img-container-shiny-active' : 'pki-img-disabled'} style={{ transform: 'scale(2)' }}/>
                        <div className="pki-img-button-container">
                            {(pokemonInfo.shinySprite || pokemonInfo.shinyModel3D) && <button onClick={handleShiny} className={`pki-img-button-shiny ${renderCharacteristics.isShiny ? 'pki-img-button-container-shiny-active' : ''}`}>
                              <img src="../../assets/ShinyIcon.png" alt="" />
                            </button>}
                            {pokemonInfo.model3D && <button onClick={handle3D} className={`pki-img-button-model3D ${renderCharacteristics.isShiny ? 'pki-img-button-container-model3D-active' : ''}`}>
                              {renderCharacteristics.is3D ? <p>2D</p> : <p>3D</p>}
                            </button>
                            }
                        </div>
                    </article>
                    <article className='pki-characteristics'>
                      <div className ='pki-types'>
                        <h2 className={`pki-type-${pokemonInfo.type1.toUpperCase()}`}>{pokemonInfo.type1.toUpperCase()}</h2>
                        {pokemonInfo.type2 && <h2 className={`pki-type-${pokemonInfo.type2?.toUpperCase()}`}>{pokemonInfo.type2?.toUpperCase()}</h2>}
                      </div>
                    </article>
                    <article className='pki-description'>
                      <p>{pokemonInfo.description.replace('\f', ' ')}</p>
                      <span>
                        <br />
                        <a href={`https://www.wikidex.net/wiki/${pokemonInfo.displayName}`} target='_blank' rel="noreferrer">More information</a>
                      </span>
                    </article>
                    <article className='pki-stats'>
                      <h2>STATS</h2>
                      <div className='pki-stat-container'>
                        <h3>HP</h3>
                        <p className={`pki-type-${pokemonInfo.type1.toUpperCase()}`} style={{ width: `${((pokemonInfo.stats.hp / 255) * 15)}vw` }}/><span>{pokemonInfo.stats.hp}</span>
                      </div>
                      <div className='pki-stat-container'>
                        <h3>ATK</h3>
                        <p className={`pki-type-${pokemonInfo.type1.toUpperCase()}`} style={{ width: `${((pokemonInfo.stats.attack / 190) * 15)}vw` }}/><span>{pokemonInfo.stats.attack}</span>
                      </div>
                      <div className='pki-stat-container'>
                        <h3>DEF</h3>
                        <p className={`pki-type-${pokemonInfo.type1.toUpperCase()}`} style={{ width: `${((pokemonInfo.stats.defense / 230) * 15)}vw` }}/><span>{pokemonInfo.stats.defense}</span>
                      </div>
                      <div className='pki-stat-container'>
                        <h3>SP. ATK</h3>
                        <p className={`pki-type-${pokemonInfo.type1.toUpperCase()}`} style={{ width: `${((pokemonInfo.stats.specialAttack / 194) * 15)}vw` }}/><span>{pokemonInfo.stats.specialAttack}</span>
                      </div>
                      <div className='pki-stat-container'>
                        <h3>SP. DEF</h3>
                        <p className={`pki-type-${pokemonInfo.type1.toUpperCase()}`} style={{ width: `${((pokemonInfo.stats.specialDefense / 230) * 15)}vw` }}/><span>{pokemonInfo.stats.specialDefense}</span>
                      </div>
                      <div className='pki-stat-container'>
                        <h3>SPEED</h3>
                        <p className={`pki-type-${pokemonInfo.type1.toUpperCase()}`} style={{ width: `${((pokemonInfo.stats.speed / 180) * 15)}vw` }}/><span>{pokemonInfo.stats.speed}</span>
                      </div>
                    </article>
                    <article>
                      <div className='pki-variations-container'>
                        {variationInfo.forms.length > 0 ? <h2>VARIATIONS</h2> : <h2>NO VARIATIONS</h2>}
                        <div className='pki-variations'>
                          {variationInfo.forms.map((variation, index) => {
                            return (
                              <div key={index} className={`pki-variation-container pki-variation-main-type-${variation.type1.toUpperCase()}`}>
                                <img className='pki-variation-sprite' src={variation.sprite} alt={`The Sprite of ${variation.name}`} />
                                <h1 className='pki-variation-name'>{variation.name.charAt(0).toUpperCase() + variation.name.slice(1)}</h1>
                                <div className ='pki-types'>
                                  <h2 className={`pki-type-${variation.type1.toUpperCase()}`}>{variation.type1.toUpperCase()}</h2>
                                  {variation.type2 && <h2 className={`pkc-type-${variation.type2?.toUpperCase()}`}>{variation.type2?.toUpperCase()}</h2>}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </article>
                </section>
                <Footer/>
            </div>
    )
  }
}
