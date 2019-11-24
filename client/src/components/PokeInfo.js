import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AbilityList from './AbilityList';
import MoveList from './MoveList';
import Summary from './Summary';
import CircularProgress from '@material-ui/core/CircularProgress';
import {capitalizeFirst} from './../Functions.js';

class PokeInfo extends Component {
  getPokemonInfo() {
    let {pokemon} = this.props;

    return (
      <div>
        <Summary
          url={pokemon.species.url}
          sprite={pokemon.sprites.front_default}
        />
        <AbilityList
          abilities={pokemon.abilities}
          />
        <MoveList
          moveList={pokemon.moves}
          />
      </div>
    );
  }

  getActions() {
    let {hideDetail, editMode} = this.props;

    return (
      <React.Fragment>
        {editMode && <Button onClick={hideDetail} color="primary">
          Pick
        </Button>}
        <Button onClick={hideDetail} color="secondary">
          Close
        </Button>
      </React.Fragment>
    );
  }

  render() {
    let {pokemon, show} = this.props;

    if (!pokemon) {
      return <CircularProgress />;
    }

    return (
      <Dialog open={show}>
        <DialogTitle>
          {capitalizeFirst(pokemon.name)}
        </DialogTitle>
        <DialogContent>
          {this.getPokemonInfo()}
        </DialogContent>
        <DialogActions>
          {this.getActions()}
        </DialogActions>
      </Dialog>
    );
  }
}

export default PokeInfo;