import React, { Component } from 'react'; 
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import TeamPage from './containers/TeamPage';
import SnackbarPoke from './components/SnackbarPoke';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const PageTitles = {
	'login': 'Login',
	'home': 'Your teams',
	'team': 'Team builder',
}

class App extends Component {
  constructor() {
    super();

    this.state = {
    	snackOpen: false,
			snackMessage: '',
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

  getContent() {
  	const {currentPage} = this.state;

  	switch (currentPage) {
  		case 'login': 
  			return (
  				<LoginPage
	  				handleChangePage={this.handleChangePage.bind(this)}
	  				setUser={this.setUser.bind(this)}
	  				openSnackBar={this.openSnackBar.bind(this)}
					/>
				);
  		case 'home': 
		    return (
	    		<HomePage
		    		user={this.state.currentUser}
	  				openSnackBar={this.openSnackBar.bind(this)}
	  				handleChangePage={this.handleChangePage.bind(this)}
	  				setUser={this.setUser.bind(this)}
	    		/>
    		);
  		case 'team': 
		    return (
	    		<TeamPage
		    		user={this.state.currentUser}
	  				handleChangePage={this.handleChangePage.bind(this)}
	  				openSnackBar={this.openSnackBar.bind(this)}
	  				setUser={this.setUser.bind(this)}
	    		/>
    		);
  		default: 
		    return "Error!"
  	}
	}

	getAppBar() {
		return (
	    <AppBar position="static">
	      <Toolbar style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
		        <Grid container spacing={2}>
		        	<Grid item xs={11}>
				        <Typography variant="h6">
				          {PageTitles[this.state.currentPage]}
				        </Typography>
				      </Grid>
			      </Grid>
	      </Toolbar>
	    </AppBar>
    );
	}

  render() {
    return (
      <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
        <CssBaseline />
      	{this.getAppBar()}
        <Container maxWidth="md" style={{flexGrow: 1, display: "flex", justifyContent: "center", alignContent: "center"}}>
		      <SnackbarPoke message={this.state.snackMessage} open={this.state.snackOpen}/>
	        {this.getContent()}
        </Container>
      </div>
    );
  }
}

export default App;