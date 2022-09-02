import { Button } from '@mui/material';
import React, { Component } from 'react';
import global from '../../styles/global';

class Listed extends Component {
  state = {};
  render() {
    let statusBadge = 'unlisted';
    if (!this.props.listed) statusBadge = 'listed';
    return (
      <Button
        variant="contained"
        color={statusBadge}
        sx={{ ...global.badgeStatus }}
        onClick={this.props.onToggleListed}
      >
        {statusBadge}
      </Button>
    );
  }
}

export default Listed;
