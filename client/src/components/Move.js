import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { capitalizeFirst, getEnglishText, typeColors } from './../Functions.js';
import $ from 'jquery';

class Move extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      move: "",
    };
  }
  
  componentWillMount() {
    this.getApiData();
  }

  getApiData() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: true,
      success: function(data) {
        this.setState({move: data});
        this.setState({loaded: true});
      }.bind(this)
    });
  }

  render() {
    if (!this.state.loaded) {
      return "Loading..";
    }

    return (
      <Card style={{
        border: "solid 2px " + typeColors[this.state.move.type.name] 
      }}>
        <CardContent>
          <Typography style={{color: typeColors[this.state.move.type.name]}} gutterBottom>
            <b>{getEnglishText(this.state.move.names, 'name')}</b>
          </Typography>
          <Typography variant="body2">
            <b>Type: </b>{capitalizeFirst(this.state.move.type.name)}
          </Typography>
          {this.state.move.power && <Typography variant="body2">
            <b>Power: </b>{this.state.move.power}
          </Typography>}
          {this.state.move.accuracy && <Typography variant="body2">
            <b>Accuracy: </b>{this.state.move.accuracy}
          </Typography>}
          <Typography variant="body2">
            {getEnglishText(this.state.move.flavor_text_entries, 'flavor_text')}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Move;
