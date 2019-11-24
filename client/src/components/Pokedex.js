import React, { Component } from 'react';
import PokeCard from './PokeCard';
import Grid from '@material-ui/core/Grid';

class Pokedex extends Component {

  getDetail(pokeUrl) {
    this.props.showDetail(pokeUrl);
  }

  render() {
    let pokemonList;
    if (this.props.pokemon) {
      pokemonList = this.props.pokemon.map(pokemon => {
        return (
          <PokeCard showDetail={this.getDetail.bind(this)} key={pokemon.name} pokemon={pokemon.url} />
        );
      });
    }
    
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {pokemonList}
        </Grid>
      </Grid>
    )
  }
}

export default Pokedex;
