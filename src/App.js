import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Menu from './components/Menu';
import OrderTable from './views/OrderDetailView';
import { Container } from '@material-ui/core';
import React from 'react';
import Navbar from './components/Navbar';


function App() {

  const [responseData, setResponseData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [searchActive, setSearchActive] = React.useState(false);
  const [searchData, setSearchData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");


  
  return (
      <Container
        maxWidth="100%"
      >
        <Grid>
          <Navbar />
        </Grid>
        <Grid container >
          <Paper elevation={0} style={{backgroundColor:'#273D49CC', width:'100%', color:'white'}}>
            <Grid>
              <Menu
                searchActive={searchActive}
                responseData = {responseData}
                setResponseData={setResponseData}
                selected={selected}
                setSelected={setSelected}
                setSearchActive={setSearchActive}
                setSearchData={setSearchData}
                setSearchQuery={setSearchQuery}
              />
            </Grid>
            <Grid>
              <OrderTable
                searchActive={searchActive}
                responseData={searchActive ? searchData : responseData}
                setResponseData={setResponseData}
                selected={selected}
                setSelected={setSelected}
                setSearchActive={setSearchActive}
                setSearchData={setSearchData}
                searchData={searchData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </Grid>
          </Paper>
        </Grid>
      </Container>
  );
}

export default App;
