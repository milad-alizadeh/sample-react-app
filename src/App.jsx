import './App.css'
import pokemon from '../pokemon.json'
import PropTypes from 'prop-types'
import React from 'react'

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.array,
    onSelect: PropTypes.func
  })
}

function App() {
  const [filter, filterSet] = React.useState('')
  const [selectedItem, selectedItemSet] = React.useState('')

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1rem'
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gridGap: '1rem'
      }}>
        <div>
          <input type="text" value={filter} onChange={evt => filterSet(evt.target.value)} />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {
                pokemon
                .slice(0, 20)
                .filter(pokemon => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                .map(pokemon => ( 
                  <PokemonRow key={pokemon.id} pokemon={pokemon} onSelect={ pokemon => selectedItemSet(pokemon) }/>
                ))
              }
            </tbody>
          </table>
        </div>
        { selectedItem && (
          <div>
            <h1>{selectedItem.name.english}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
 