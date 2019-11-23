import React, { Component } from 'react';
import $ from 'jquery';
import Pokedex from './components/Pokedex';
import PokeInfo from './components/PokeInfo';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      pokemon: { results: [], next: "" },
      pokeDetail: {},
      show: false,
      loading: false
    }
  }

  getDatabaseData() {
    fetch("http://localhost:9000/connection")
      .then(data => data.text())
      .then(data => this.setState({ data }));
  }

  getPokemonData(apiUrl) {
    if (apiUrl === undefined) {
      const rand = 0 + Math.random() * (600 - 0);

      apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=100&offset="+rand;
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