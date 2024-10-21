import { Provider } from 'react-redux';
import './App.css';
import appStore from './redux/store';
import { Navigations } from './router';
import { ThemeProvider } from '@mui/material';
import theme from './utils/MuiTheme';

function App() {

  return (
    <Provider store={appStore}>
      <ThemeProvider theme={theme}>
        <Navigations />
      </ThemeProvider>
    </Provider>
  );
}

export default App
