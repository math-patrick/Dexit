import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PokemonAvatar from './../components/PokemonAvatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    }
  }

  getUserTeams() {
    let userTeams = this.state.user.teams;

    if (userTeams && userTeams.length > 0) {
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
      <Grid item xs={12} align="center" key={userTeam.name}>
        <Paper style={{width: "100%", padding: "20px"}}>
          <Typography component="div">
            <Box fontSize={30} fontWeight="fontWeightBold">
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
    return pokemon.map((pokemon) => {
      let pokemonURL = 'https://pokeapi.co/api/v2/pokemon/'+pokemon;

      return (
        <Grid item key={pokemon} xs={2}>
          <PokemonAvatar
            pokemon={pokemonURL} />
        </Grid>
      );
    });
  }

  render() {
    let {handleChangePage} = this.props;

    return (
      <div>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography component="div">
              <Box fontSize={50} fontWeight="fontWeightBold">
                  Your teams
              </Box>
            </Typography>
          </Grid>
          {this.getUserTeams()}
        </Grid>
        <Fab onClick={handleChangePage.bind(this, 'team')} variant="extended" color="primary" aria-label="add" style={{position: "fixed", right: "10px", bottom: "10px"}}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default HomePage;