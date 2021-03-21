import TextField from '@material-ui/core/TextField';
import React from 'react';
import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';


export default function SearchBar(props) {

    const {setSearchActive, setSearchData, setSearchQuery} = props;

    const URL = `${SERVER_URL}${ROLL_NUMBER}/SearchSalesOrder?`;

    const handleChange = (e) => {
        if (e.target.value.length > 0) {
            setSearchActive(true);
            fetchSearchData(e.target.value);
        } else {
            setSearchActive(false);
        }
        setSearchQuery(e.target.value);
    }

    const debounce = (func, wait) => {
        let timeout;
      
        return function executedFunction(...args) {
          const later = () => {
            timeout = null;
            func(...args);
          };
      
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      };

    const fetchSearchData = (query) => {
        axios.get(URL + "query=" + query)
            .then((res) => setSearchData(res.data))
            .catch((error) => console.log(error))
    }

    return (
        <TextField 
            id="searchQuery"
            onChange={handleChange}
            label="Search by Invoice #" 
            variant="outlined"
        />
    )
}