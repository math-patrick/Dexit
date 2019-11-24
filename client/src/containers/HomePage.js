import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PokemonAvatar from './../components/PokemonAvatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

class HomePage extends Component {
  handleDeleteTeam(index) {
    const {user, openSnackBar, setUser} = this.props;
    
    axios
      .get('http://localhost:3001/api/getData')
      .then((response) => {
        let loggedUser = response.data.data.filter(account => {
          return account.login === user.login
        })[0];

        loggedUser.teams.splice(index, 1);

        axios
          .post('http://localhost:3001/api/updateData', {
            id: user._id,
            update: { teams: loggedUser.teams },
          })
          .then((data) => {
            openSnackBar("Team deleted with sucess!");
            setUser(loggedUser);
          });
      });
  }
  
  getUserTeams() {
    let userTeams = this.props.user.teams;
    debugger;
    if (userTeams && userTeams.length > 0) {
      return (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {userTeams.map((userTeam, index) => this.getUserTeam(userTeam, index))}
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid item align={"center"} xs={12}>
        <Typography component="div">
          <Box fontSize={30} fontWeight="fontWeightBold">
            No teams found!
          </Box>
        </Typography>
      </Grid>
    );
  }

  getUserTeam(userTeam, index) {
    return (
      <Grid item xs={12} align="center" key={index}>
        <Paper style={{width: "1000px", padding: "20px"}}>
          <Grid container spacing={2}>
            <Grid item textAlign="left" xs={10}>
              <Typography component="div">
                <Box fontSize={30} fontWeight="fontWeightBold">
                  {userTeam.name}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={this.handleDeleteTeam.bind(this, index)}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
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
          <PokemonAvatar pokemon={pokemonURL} />
        </Grid>
      );
    });
  }

  render() {
    let {handleChangePage} = this.props;

    return (
      <div>
        <Grid container justify="center" spacing={2} style={{height: "100%", alignContent: "center"}}>
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