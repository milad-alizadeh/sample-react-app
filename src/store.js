import { computed, makeAutoObservable, makeObservable, observable } from 'mobx'

class Store { 
  pokemon = []
  filter = ''
  selectePokemon = null   

  constructor() {
    makeObservable(this, {
      pokemon: observable,
      filter: observable,
      selectePokemon: observable,
      filteredPokemon: computed
    })
  }

  setPokemon(pokemon) {
    this.pokemon = pokemon
  }
  setFilter(filter) {
    this.filter = filter
  }
  setSelectedPokemon(selectePokemon) {
    this.selectePokemon = selectePokemon
  }

  get filteredPokemon () {
    return this.pokemon
      .slice(0, 20)
      .filter(pokemon => pokemon.name.english.toLowerCase().includes(this.filter.toLowerCase()))
  }
}

const store = new Store()

fetch('http://localhost:5173/pokemon.json')
.then((resp) => resp.json())
.then((pokemon) => store.setPokemon(pokemon))

export default store