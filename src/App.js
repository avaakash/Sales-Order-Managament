import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import OrderTable from './views/OrderTable';
import { Container } from '@material-ui/core';
import AddOrder from './components/AddOrder';
import { store } from './reducers/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <OrderTable />
      </Container>
    </Provider>
  );
}

export default App;
