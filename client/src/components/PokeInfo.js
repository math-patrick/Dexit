import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AbilityList from './AbilityList';
import MoveList from './MoveList';
import Summary from './Summary';
import {capitalizeFirst} from './../Functions.js';

class PokeInfo extends Component {
  hideClick() {
    this.props.hideDetail();
  }

  getPokemonInfo() {
    if (this.props.pokeDetail.name === undefined) {
      return (
        <div itemID="detail-loader">
          <p>Fetching Data...</p>
          <div className="spinner-small"></div>
        </div>
      );
    }
    
    return (
      <div>
        <Summary
          url={this.props.pokeDetail.species.url}
          sprite={this.props.pokeDetail.sprites.front_default}
        />
        <AbilityList
          abilities={this.props.pokeDetail.abilities}
          />
        <MoveList
          moveList={this.props.pokeDetail.moves}
          />
      </div>
    );
  }

  render() {
    let pokemonName;
    if (this.props.pokeDetail.name !== undefined) {
      pokemonName = capitalizeFirst(this.props.pokeDetail.name);
    }

    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>
          {pokemonName}
        </DialogTitle>
        <DialogContent>
          {this.getPokemonInfo()}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideClick.bind(this)} color="primary">
            Pick
          </Button>
          <Button onClick={this.hideClick.bind(this)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default PokeInfo;