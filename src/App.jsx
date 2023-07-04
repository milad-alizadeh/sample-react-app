import './App.css'
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
    type: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  })
}

PokemonInfo.propTypes = { 
  name: PropTypes.shape({
    english: PropTypes.string.isRequired
  }),
  type: PropTypes.array.isRequired
}

function App() {
  const [filter, filterSet] = React.useState('')
  const [selectedItem, selectedItemSet] = React.useState(null)
  const [pokemon, pokemonSet] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5173/pokemon.json')
      const data = await response.json()
      pokemonSet(data)
    }

    try {
      fetchData()
    } catch(e) {
      console.error(e)
    }
  }, [])

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
        { selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  )
}

export default App
 