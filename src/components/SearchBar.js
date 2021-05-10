import TextField from '@material-ui/core/TextField';
import React from 'react';
import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';
import { element } from '../utils/styles';


export default function SearchBar(props) {

    const {setSearchActive, setSearchData, setSearchQuery} = props;

    const elementStyles = element();

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

    const debounce = function (fn, d) {
        let timer;
        return function () {
          let context = this,
            args = arguments;
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn.apply(context, args);
          }, d);
        };
      };

    const fetchSearchData = debounce((query) => {
        axios.get(URL + "query=" + query)
            .then((res) => setSearchData(res.data))
            .catch((error) => console.log(error))
    }, 1000)

    return (
        <TextField 
            id="searchQuery"
            onChange={handleChange}
            label="Search by Invoice #" 
            variant="outlined"
            size='small'
            className={elementStyles.searchBar}
        />
    )
}