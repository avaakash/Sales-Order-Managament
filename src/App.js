import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import OrderTable from './views/OrderTable';
import { Container } from '@material-ui/core';
import AddOrder from './components/AddOrder';
import React from 'react';
// import { store } from './reducers/store';
import { Provider } from 'react-redux';

function App() {

  const [responseData, setResponseData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);


  return (
    // <Provider store={store}>
      <Container>
        <Header
          responseData={responseData}
          setResponseData={setResponseData}
          deleteList={selected}
          setDeleteList={setSelected} />
        <OrderTable
          responseData={responseData}
          setResponseData={setResponseData}
          selected={selected}
          setSelected={setSelected}
        />
      </Container>
    // </Provider>
  );
}

export default App;
