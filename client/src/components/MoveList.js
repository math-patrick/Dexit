import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Move from './Move';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

class MoveList extends Component {
  getLastFourMoves() {
    let {moveList} = this.props;

    moveList = moveList.filter(move => {
      return move.version_group_details[0].level_learned_at <= 50 && move.version_group_details[0].move_learn_method.name === "level-up"
    });
    moveList.reverse();
    moveList = moveList.slice(0, 4);

    return moveList;
  }

  render() {
    let moveList = this.getLastFourMoves();
    
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" component="h6">
            Moves
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Grid container justify="center" spacing={2}>
              {moveList.map(move => {
                return (
                  <Grid key={move.id} item xs={12}>
                    <Move url={move.move.url} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default MoveList;
