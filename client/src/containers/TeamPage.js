import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import PokeCard from './../components/PokeCard';
import axios from 'axios';
import $ from 'jquery';

class TeamPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: 'Team',
      user: props.user,
      pokemonList: undefined,
      selectedPokemon: []
    }
  }

  changeInput(event) {
    this.setState({teamName: event.target.value});
  }

  getPokemonData(apiUrl) {
    const rand = 0 + Math.random() * (600 - 0);

    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/?limit=24&offset="+rand,
      dataType: "json",
      cache: true,
      success: function(data) {
        this.setState({ pokemonList: data.results });
      }.bind(this),
    })
  }

  selectPokemon(pokemonName) {
    let {selectedPokemon} = this.state;
    let {openSnackBar} = this.props;

    if (selectedPokemon.includes(pokemonName)) {
      selectedPokemon.splice(selectedPokemon.indexOf(pokemonName), 1);
    } else if (selectedPokemon.length < 6) {
      selectedPokemon.push(pokemonName);
    } else {
      openSnackBar("Can't select more than 6 pokémon!");
      return false;
    } 

    this.setState(selectedPokemon);
  }

  saveTeam() {
    const {selectedPokemon, teamName} = this.state;
    const {user, openSnackBar, handleChangePage, setUser} = this.props;
    
    if (selectedPokemon.length < 1) {
      openSnackBar("You need to select at least one pokémon!");
      return false;
    }

    if (selectedPokemon.length > 6) {
      openSnackBar("Your team can't have mora than six pokémon!");
      return false;
    }

    if (!teamName) {
      openSnackBar("You team needs a name!");
      return false;
    }

    axios
      .get('http://localhost:3001/api/getData')
      .then((response) => {
        let loggedUser = response.data.data.filter(account => {
          return account.login === user.login
        })[0];
        let teams = loggedUser.hasOwnProperty('teams') ? loggedUser.teams : [];

        teams.push({
          id: teams.length,
          name: teamName,
          pokemon: selectedPokemon
        })

        loggedUser.teams = teams;

        axios
          .post('http://localhost:3001/api/updateData', {
            id: user._id,
            update: { teams },
          })
          .then((data) => {
            openSnackBar("Team saved with sucess!");
            setUser(loggedUser);
            handleChangePage('home');
          });
      });
  }

  componentWillMount() {
    this.getPokemonData();
  }

  getPokemonList() {
    let {pokemonList} = this.state;

    if (!pokemonList) {
      return <CircularProgress />
    }

    return (
      <Paper>
        <Grid container justify="center" spacing={2} style={{padding: "20px"}}>
          <Grid item xs={12}>
            <Typography component="div">
              <Box fontSize={20} fontWeight="fontWeightBold">
                  Choose your pokémon
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {pokemonList.map(pokemon => this.getPokemon(pokemon))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  getPokemon(pokemon) {
    let {selectedPokemon} = this.state;

    return (
      <Grid item xs={3} key={pokemon.id}>
        <PokeCard
          pokemon={pokemon.url}
          selected={selectedPokemon.includes(pokemon.name)}
          canSelect={selectedPokemon > 6}
          selectPokemon={this.selectPokemon.bind(this)}
        />
      </Grid>
    );
  }

  getTeamNamePicker() {
    return (
      <Paper>
        <Grid container justify="center" spacing={2} style={{padding: "20px"}}>
          <Grid item xs={12}>
            <Typography component="div">
              <Box fontSize={20} fontWeight="fontWeightBold">
                Choose your team name
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField id="standard-basic" label="Team name" value={this.state.teamName} onChange={this.changeInput.bind(this)} />
          </Grid>
        </Grid>
      </Paper>
    );  
  }

  render() {
    return (
      <div>
        <Grid container justify="center" spacing={5}>
          <Grid item xs={12}>
            {this.getTeamNamePicker()}
          </Grid>
          <Grid item xs={12}>
            {this.getPokemonList()}
          </Grid>
        </Grid>
        <Fab onClick={this.saveTeam.bind(this)} variant="extended" color="primary" aria-label="add" style={{position: "fixed", right: "10px", bottom: "10px"}}>
          <SaveIcon />
        </Fab>
      </div>
    );
  }
}

export default TeamPage;