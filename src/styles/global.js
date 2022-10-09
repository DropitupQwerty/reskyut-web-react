import signInBg from '../assets/signInBg.webp';

const global = {
  button1: {
    color: '#333',
    padding: '20px',
    width: '348px',
    height: '79px',
    background: '#ADFF00',
    borderRadius: '20px',
    fontWeight: 'bold',
  },
  button2: {
    background: '#E94057',
    color: '#333',
    padding: '20px',
    width: '348px',
    height: '79px',
    borderRadius: '20px',
    fontWeight: 'bold',
  },
  button2Small: {
    background: '#E94057',
    color: '#333',
    padding: '20px',
    borderRadius: '20px',
    height: ' 51px',
    width: ' 173px',
    fontWeight: 'bold',
  },
  button3: {
    color: '#333',
    padding: '20px',
    background: '#D4D4D4',
    borderRadius: '20px',
    fontWeight: 'bold',
    height: ' 51px',
    width: ' 173px',
  },
  button2xs: {
    margin: '0 5px',
    background: '#E94057',
    color: '#333',
    padding: '10px',
    borderRadius: '20px',
    width: '120px',
    height: '40px',
    fontWeight: 'bold',
  },
  button1xs: {
    margin: '0 5px',
    background: '#ADFF00',
    color: '#333',
    padding: '10px',
    borderRadius: '20px',
    width: '120px',
    height: '40px',
    fontWeight: 'bold',
  },
  button3xs: {
    margin: '0 5px',
    background: '#7F7F7F',
    color: '#333',
    padding: '10px',
    borderRadius: '20px',
    width: '120px',
    height: '40px',
    fontWeight: 'bold',
  },
  paperDashboard: {
    height: '196px',
    padding: ' 20px',
  },
  textHeader: {
    color: '#E94057',
    fontWeight: 'bold',
  },
  badgeStatus: {
    margin: '0 5px',
    color: '#333',
    padding: '10px',
    borderRadius: '20px',
    width: '120px',
    height: '40px',
    fontWeight: 'bold',
  },

  buttonBack: {
    width: '52px',
    height: '52px',
    borderRadius: '10px',
    border: '1px solid #E8E6EA',
    m: 1,
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${signInBg})`,
    backgroundPosition: 'center',
  },
  signInPaper: {
    height: '450px',
    width: '450px',
    borderRadius: '20px',
  },
  addAnimalLabels: {
    marginRight: '12px',
    fontWeight: 'bold',
    width: '100px',
  },
  borderRadius20: {
    borderRadius: '20px',
  },
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

export default global;
