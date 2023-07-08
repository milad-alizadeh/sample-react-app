import './App.css'
import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import store from './store'
import { observer } from 'mobx-react'

const Title = styled.h1`
  text-align: left;
  font-size: 40px;
`

const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={store.setSelectedPokemon(pokemon)}>Select</button>
    </td>
  </tr>
)

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table width="100%">
      <tbody>
        {
          Object.keys(base).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired
    }),
    type: PropTypes.array.isRequired
  })
}

PokemonInfo.propTypes = {  
  name: PropTypes.shape({
    english: PropTypes.string.isRequired
  }),
  type: PropTypes.array.isRequired
}

function App() {
  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1rem'
      }}
    >
      <Title>Pokemon Search</Title>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gridGap: '1rem'
      }}>
        <div>
          <input type="text" value={store.filter} onChange={evt => store.setFilter(evt.target.value)} />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {
                store.filteredPokemon
                .map(pokemon => ( 
                  <PokemonRow key={pokemon.id} pokemon={pokemon}/>
                ))
              }
            </tbody>
          </table>
        </div>
        { store.selectedItem && <PokemonInfo {...store.selectedItem} />}
      </div>
    </div>
  )
}

export default observer(App)
 