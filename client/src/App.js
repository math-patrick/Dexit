import React, { Component } from 'react'; 
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import TeamPage from './containers/TeamPage';
import SnackbarPoke from './components/SnackbarPoke';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

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
	  				handleChangePage={this.handleChangePage.bind(this)}
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

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" style={{height: "100%", display: "flex", justifyContent: "center", alignContent: "center"}}>
		      <SnackbarPoke message={this.state.snackMessage} open={this.state.snackOpen}/>
	        {this.getContent()}
        </Container>
      </React.Fragment>
    );
  }
}

export default App;