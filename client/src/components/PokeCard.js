import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import PokeInfo from './../components/PokeInfo';
import Typography from '@material-ui/core/Typography';
import {capitalizeFirst} from './../Functions.js';
import $ from 'jquery';

class PokeCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      detailOpen: false,
      pokemon: undefined,
    }
  }

  getPokemonData() {
    $.ajax({
      url: this.props.pokemon,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({ pokemon: data });
        this.setState({ name: data.name });
      }.bind(this),
    })
  }

  componentDidMount() {
    this.getPokemonData();
  }

  toggleDetail(toggle) {
    this.setState({detailOpen: toggle});
  }

  render() {
    let {pokemon, detailOpen} = this.state;
    let {selected, selectPokemon} = this.props

    if (!pokemon) {
      return null;
    }

    return (
      <React.Fragment>
        <PokeInfo
          pokemon={pokemon}
          show={detailOpen}
          hideDetail={this.toggleDetail.bind(this, false)}
          editMode
          />
        <Card style={selected ? {backgroundColor: "#ccff90"} : {}}>
          <CardActionArea onClick={selectPokemon.bind(this, pokemon.name)}>
            <CardMedia
              component="img"
              height={'140'}
              src={pokemon.sprites.front_default}
              title={capitalizeFirst(pokemon.name)}
            />
            <CardContent>
              <Typography component="h5" variant="h5">
                {capitalizeFirst(pokemon.name)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={selectPokemon.bind(this, pokemon.name)}>
              {!selected ? "Pick" : "Undo pick"}
            </Button>
            <Button size="small" color="default" onClick={this.toggleDetail.bind(this, true)}>
              Summary
            </Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default PokeCard;
