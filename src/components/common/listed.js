import { Button } from '@mui/material';
import React, { Component } from 'react';
import global from '../../styles/global';

class Listed extends Component {
  state = {};
  render() {
    let statusBadge = ['unlisted', 'unlisted'];
    if (!this.props.listed) statusBadge = ['listed', 'listed'];
    return (
      <Button
        variant="contained"
        color={statusBadge[1]}
        sx={{ ...global.badgeStatus }}
        onClick={this.props.onToggleListed}
      >
        {statusBadge[0]}
      </Button>
    );
  }
}

export default Listed;
