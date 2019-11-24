import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Ability from './Ability';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

class AbilityList extends Component {
  render() {
    let {abilities} = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant="h6" component="h6">
            Abilities
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Grid container justify="center" spacing={1}>
              {abilities.map(ability => {
                return (
                  <Grid key={ability.id} item xs={12}>
                    <Ability url={ability.ability.url} />
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

export default AbilityList;
