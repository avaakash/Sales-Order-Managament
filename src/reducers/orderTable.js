
const initialState = {
    responseData: [],
    hasNext: false,
    pageNumber: 0,
    selected: []
}

export default function orderTableReducer(state = initialState, action) {
    switch(action.type) {
        case "table/responseData":
            return {...state, responseData: [...action.payload]};
        case "table/hasNext":
            return {...state, hasNext: action.payload};
        case "table/nextPageNumber":
            return {...state, pageNumber: state.pageNumber+1};
        case "table/selected":
            return {...state, selected: action.payload};
        default:
            return state;
    }
}