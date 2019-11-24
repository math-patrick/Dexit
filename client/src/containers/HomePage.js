import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PokeCard from './../components/PokeCard';

class PokedexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    }
  }

  emptyFunc() {

  }

  getUserTeams() {
    let userTeams = this.state.user.teams;
    userTeams = [
      {name: "Elemental", pokemon: [1, 2, 3, 4, 5, 6]},
      {name: "Elemental 2", pokemon: [54, 232, 343, 412, 512, 633]}
    ];

    if (userTeams) {
      return (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {userTeams.map(userTeam => this.getUserTeam(userTeam))}
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid item xs={12}>
        <Typography>
          No teams found!
        </Typography>
      </Grid>
    );
  }

  getUserTeam(userTeam) {
    return (
      <Grid item xs={12} justify="center" spacing={2}>
        <Paper style={{width: "100%", padding: "20px"}}>
          <Typography>
            <Box m={1} fontSize={30} fontWeight="fontWeightBold">
              {userTeam.name}
            </Box>
          </Typography>
          <Grid container justify="center" spacing={2}>
            {this.getTeamPokemon(userTeam.pokemon)}
          </Grid>
        </Paper>
      </Grid>
    );
  }

  getTeamPokemon(pokemon) {
    return pokemon.map((pokemon, index) => {
      let pokemonURL = 'https://pokeapi.co/api/v2/pokemon/'+pokemon;

      return (
        <Grid item xs={4}>
          <PokeCard showDetail={this.emptyFunc.bind(this)} key={index} pokemon={pokemonURL} />
        </Grid>
      );
    });
  }

  render() {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} alignSelf="flex-start">
          <Typography>
            <Box m={1} fontSize={50} fontWeight="fontWeightBold">
                Your teams
            </Box>
          </Typography>
        </Grid>
        {this.getUserTeams()}
      </Grid>
    );
  }
}

export default PokedexPage;