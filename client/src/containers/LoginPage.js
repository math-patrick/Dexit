import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const buttonStyle = {
  width: "150px",
}

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: true,
      login: undefined,
      password: undefined,
    }
  }

  handleLogin() {
    const {login, password} = this.state;

    axios
      .get('http://localhost:3001/api/getData', {
        login: login,
        password: password,
      })
      .then((response) => {
        let loggedUser = response.data.data.filter(account => {
          return account.login === login && account.password === password
        });

        if (loggedUser !== undefined && loggedUser[0] !== undefined) {
          this.props.openSnackBar("Welcome "+loggedUser[0].login+"!");
          this.props.setUser(loggedUser[0]);
          this.props.handleChangePage('home');
        } else {
          this.props.openSnackBar("The username or password is incorrect!");
        }
      });
  }

  handleRegister() {
    const {login, password} = this.state;
    
    axios
      .get('http://localhost:3001/api/getData', {
        login: login,
      })
      .then((response) => {
        let loggedUser = response.data.data.filter(account => {
          return account.login === login
        });

        if (loggedUser !== undefined && loggedUser[0] !== undefined) {
          this.props.openSnackBar("The username "+loggedUser[0].login+" already exists!");
        } else {
          axios
            .post('http://localhost:3001/api/putData', {
              login: login,
              password: password,
            })
            .then((data) => this.props.openSnackBar("User "+login+" registered with sucess!"));
        }
      });
  }

  changeInput(event) {
    let stateObject = function() {
      let returnObj = {};
      returnObj[this.target.id] = this.target.value;
         return returnObj;
    }.bind(event)();

    this.setState(stateObject);
  }

  getButtons() {
    return (
      <Grid
        style={{marginTop: "50px"}}
        container
        align="center"
        justify="space-around"
        spacing={1} >
        <Grid item xs={12}>
            <Button
              style={buttonStyle}
              onClick={this.handleLogin.bind(this)}
              variant="contained"
              color="primary"
              size="large">
              Login
            </Button>
        </Grid>
        <Grid item xs={12}>
            <Button
              style={buttonStyle}
              onClick={this.handleRegister.bind(this)}
              variant="contained"
              color="default"
              size="large">
              Register
            </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {login, password} = this.state;

    return (
      <Paper id='loginContainer' style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{padding: "20px"}}>
          <Grid
            container
            align="center"
            justify="space-around"
            spacing={3} >
            <Grid item xs={12}>
              <Typography component="div">
                <Box fontSize={50} fontWeight="fontWeightBold">
                    Dexit
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id="login" style={{width: "300px"}}value={login} label="Login" onChange={this.changeInput.bind(this)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField id="password" style={{width: "300px"}}value={password} label="Password" type="password" onChange={this.changeInput.bind(this)}/>
            </Grid>
            <Grid item xs={12}>
              {this.getButtons()}
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default LoginPage;
