import React from 'react';
import {
  Toolbar,
  Box,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
} from '@mui/material';

const drawerWidth = 240;

const style = {
  messageRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px',
    marginBottom: '10px',
  },
  messageLeft: {
    display: 'flex',
    padding: '20px',
    marginBottom: '10px',
    justifyContent: 'flex-start',
  },

  msgStyle: {
    padding: '20px',
    fontSize: '14px',
    lineHeight: '150%',
    bgcolor: '#FDF1F3',
  },
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function MessageArea() {
  return (
    <div>
      <Toolbar />
      {/* MESSAGE AREA */}
      <Box aria-label="Message right" sx={style.messageRight}>
        <Paper sx={style.paperMsg}>
          <Typography sx={style.msgStyle}>
            Hello, Mr. Tabao. Nag notify po samin na gusto nyo pong i adopt si
            Chops.
          </Typography>
        </Paper>
        <Avatar {...stringAvatar('Jeffrey Sanches')} />
      </Box>
      <Box aria-label="Message Left" sx={style.messageLeft}>
        <Avatar {...stringAvatar('Stray Worth Saving')} />
        <Paper sx={style.paperMsg}>
          <Typography sx={style.msgStyle}>
            Hello, opo gusto ko po sana i adopt si Chops. ano po ba ang mga
            kailangan?
          </Typography>
        </Paper>
      </Box>
      <Box aria-label="Message right" sx={style.messageRight}>
        <Paper sx={style.paperMsg}>
          <Typography sx={style.msgStyle}>Okay Sige po</Typography>
        </Paper>
        <Avatar {...stringAvatar('Jeffrey Sanches')} />
      </Box>

      {/* sender Info */}

      {/* TextField for message Sending */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: '0',
          p: 2,
          right: '450px',
          left: drawerWidth,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            placeholder="Send Message"
            multiline
            maxRows={2}
          />
          <Box>
            <Button>send</Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
