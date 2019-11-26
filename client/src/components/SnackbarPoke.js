import React, { Component } from 'react'; 
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class SnackbarPoke extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackOpen: props.open,
      snackMessage: props.message,
    }
  }

  componentWillReceiveProps(nextProps) {
	  if (nextProps.open !== this.state.snackOpen) {
	    this.setState({ snackOpen: nextProps.open });
	  }
	  
	  if (nextProps.message !== this.state.snackMessage) {
	    this.setState({ snackMessage: nextProps.message });
	  }
	}

  handleSnackClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      snackOpen: false,
      snackMessage: ''
    });
  }

  render() {
    return (
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
    );
  }
}

export default SnackbarPoke;