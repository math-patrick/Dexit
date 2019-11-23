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

class LoginInterface extends Component {
  constructor() {
    super();

    this.state = {
      state: true,
      login: undefined,
      password: undefined,
    }
  }

  getUser() {
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
          this.props.setUser(loggedUser);
          this.props.handleChangePage('dasd');
        } else {
          this.props.openSnackBar("The username or password is incorrect!");
        }
      });
  }

  handleRegister() {
    const {login, password} = this.state;
    
    axios
      .post('http://localhost:3001/api/putData', {
        login: login,
        password: password,
      })
      .then((data) => this.props.openSnackBar("User "+login+" registered with sucess!"));
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
        <Grid item xs={12} alignSelf="flex-start">
            <Button
              style={buttonStyle}
              onClick={this.handleLogin.bind(this)}
              variant="contained"
              color="primary"
              size="large">
              Login
            </Button>
        </Grid>
        <Grid item xs={12} alignSelf="flex-start">
            <Button
              style={buttonStyle}
              onClick={this.handleRegister.bind(this)}
              variant="contained"
              color="default"
              size="large">
              Register
            </Button>
        </Grid>
        <Grid item xs={12} alignSelf="flex-start">
            <Button
              style={buttonStyle}
              onClick={this.props.handleChangePage.bind('database')}
              variant="contained"
              color="default"
              size="large">
              Verificar dados
            </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {login, password} = this.state;

    return (
      <Paper  id='loginContainer' style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "20px"}}>
        <div>
          <Grid
            container
            align="center"
            justify="space-around"
            spacing={3} >
            <Grid item xs={12} alignSelf="flex-start">
              <Typography>
                <Box m={1} fontSize={50} fontWeight="fontWeightBold">
                    Dexit
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id="login" value={login} label="Login" onChange={this.changeInput.bind(this)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField id="password" value={password} label="Password" type="password" onChange={this.changeInput.bind(this)}/>
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

export default LoginInterface;
