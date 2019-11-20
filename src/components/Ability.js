import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery';

class Ability extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      ability: "",
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
        this.setState({ability: data});
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
          <Typography gutterBottom>
            <b>{this.state.ability.names[2].name}</b>
          </Typography>
          <Typography variant="body2" component="p">
            {this.state.ability.effect_entries[0].short_effect}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Ability;
