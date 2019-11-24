import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import PokeInfo from './../components/PokeInfo';
import {capitalizeFirst} from './../Functions.js';
import $ from 'jquery';

class PokemonAvatar extends Component {
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

    if (!pokemon) {
      return null;
    }

    return (
      <React.Fragment>
        <PokeInfo
          pokemon={pokemon}
          show={detailOpen}
          hideDetail={this.toggleDetail.bind(this, false)}
          />
        <Tooltip title={capitalizeFirst(pokemon.name)}>
          <Avatar
            onClick={this.toggleDetail.bind(this, true)}
            style={{width: "100px", height: "100px", cursor: "pointer"}}
            alt={capitalizeFirst(pokemon.name)}
            src={pokemon.sprites.front_default}
            />
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default PokemonAvatar;
