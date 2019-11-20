import React, { Component } from 'react';
import $ from 'jquery';
import Pokedex from './components/Pokedex';
import PokeInfo from './components/PokeInfo';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: { count: 0, previous: "", results: [], next: "" },
      pokeDetail: {},
      show: false,
      offset: 0,
      count: 0,
      loading: false
    }
  }

  getPokemonData(apiUrl) {
    if (apiUrl === undefined) {
      const rand = 0 + Math.random() * (600 - 0);

      apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset="+rand;
    }

    $.ajax({
      url: apiUrl,
      dataType: "json",
      cache: true,
      success: function(data) {
        if (apiUrl.includes("limit")) {
          this.setState({ pokemon: data });
        } else {
          this.setState({ pokeDetail: data })
        }
      }.bind(this),
      error: (xhr, status, err) => {
        console.log("We got an error here: ", xhr);
      }
    })
  }

  detailGetter(pokeApi) {
    this.setState({ pokeDetail: {} })
    this.getPokemonData(pokeApi);
    this.setState({ show: true });
  }

  detailHider() {
    this.setState({ show: false });
  }

  componentWillMount() {
    this.getPokemonData();
  }

  render() {
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
        <PokeInfo pokeDetail={this.state.pokeDetail} show={this.state.show} hideDetail={this.detailHider.bind(this)} />
        <Pokedex pokemon={this.state.pokemon.results} showDetail={this.detailGetter.bind(this)}/>
        </Grid>
      </Grid>
    );
  }
}

export default App;