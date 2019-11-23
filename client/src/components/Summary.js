import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {getEnglishText} from './../Functions.js';
import $ from 'jquery';

class Summary extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      data: "",
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
        this.setState({data: data});
        this.setState({loaded: true});
      }.bind(this)
    });
  }

  render() {
    if (!this.state.loaded) {
      return "Loading..";
    }

    return (
      <Card>
        <CardContent>
          <div style={{display: "flex", justifyContent: "center"}}><img src={this.props.sprite} alt={this.state.data.name}/></div>
          <Typography variant="body2">
            {getEnglishText(this.state.data.flavor_text_entries, 'flavor_text')}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Summary;
