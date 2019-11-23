import React, { Component } from 'react';
import $ from 'jquery';
import Pokedex from './components/Pokedex';
import PokeInfo from './components/PokeInfo';
import DatabaseHelper from './DatabaseHelper';
import LoginInterface from './login/LoginInterface';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      pokemon: { results: [], next: "" },
      pokeDetail: {},
      show: false,
      loading: false,
      currentUser: undefined,
      currentPage: 'login',
    }
  }

  handleChangePage(newPage) {
    this.setState({currentPage: newPage});
  }

  setUser(userData) {
    this.setState({currentUser: userData});
  }

  openSnackBar(message) {
    this.setState({
    	snackOpen: true,
    	snackMessage: message
    });
  };

  handleSnackClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
    	snackOpen: false,
    	snackMessage: ''
    });
  };

  getPokemonData(apiUrl) {
    if (apiUrl === undefined) {
      const rand = 0 + Math.random() * (600 - 0);

      apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50&offset="+rand;
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

  getContent() {
  	const {currentPage} = this.state;

  	switch (currentPage) {
  		case 'login': 
  			return <LoginInterface
  				handleChangePage={this.handleChangePage.bind(this)}
  				setUser={this.setUser.bind(this)}
  				openSnackBar={this.openSnackBar.bind(this)}
				/>
  		case 'database':
  			return <DatabaseHelper {...this.props}/>
  		default: 
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

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" style={{height: "100%", display: "flex", justifyContent: "center", alignContent: "center"}}>
		      <Snackbar
		        anchorOrigin={{
		          vertical: 'bottom',
		          horizontal: 'left',
		        }}
		        open={this.state.snackOpen}
		        autoHideDuration={3000}
		        onClose={this.handleSnackClose.bind(this)}
		        ContentProps={{
		          'aria-describedby': 'message-id',
		        }}
		        message={<span id="message-id">{this.state.snackMessage}</span>}
		        action={[
		          <IconButton
		            key="close"
		            aria-label="close"
		            color="inherit"
		       			onClick={this.handleSnackClose.bind(this)}
		          >
		            <CloseIcon />
		          </IconButton>,
		        ]}
		      />
          {this.getContent()}
        </Container>
      </React.Fragment>
    );
  }
}

export default App;