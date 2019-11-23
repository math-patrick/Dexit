import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {capitalizeFirst} from './../Functions.js';
import $ from 'jquery';

class PokeCard extends Component {

  constructor() {
    super();
    this.state = {
      imgUrl: "",
      name: "",
      loadingDiv: "loadingImg"
    }
  }

  getImg() {
    this.setState({ loading: "loadingImg" });
    $.ajax({
      url: this.props.pokemon.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({ imgUrl: data.sprites.front_default });
        this.setState({ loading: "loaded" });
        this.setState({ name: data.name });
      }.bind(this),

      error: function(xhr, status, err) {
        console.log(err);
      }
    })
  }

  detailClick(pokeUrl) {
    this.props.showDetail(pokeUrl);
  }

  componentDidMount() {
    this.getImg();
  }

  render() {
    return (
      <Card style={{ margin: "3px" }}>
        <CardActionArea onClick={this.detailClick.bind(this, this.props.pokemon.url)}>
          <CardMedia
            component="img"
            height={'140'}
            image={this.state.imgUrl}
            title={capitalizeFirst(this.state.name)}
          />
          <CardContent>
            <Typography component="h5" variant="h5">
              {capitalizeFirst(this.state.name)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Pick
        </Button>
          <Button size="small" color="default" onClick={this.detailClick.bind(this, this.props.pokemon.url)}>
            Summary
        </Button>
        </CardActions>
      </Card>
    );
  }
}

export default PokeCard;
