import tickets from  '../data.json';

let initState = {
    data: [],
    loading:true,
    error:null
}
let _loadTickets = () =>  ({
    type:"LOAD_TICKETS"
});
let _ticketsLoadingSuccess = (tickets) =>  ({
    type:"TICKETS_LOADING_SUCCESS",
    payload: {
        tickets
    }
});
let _ticketsLoadingFail = (error) =>  ({
    type:"TICKETS_LOADING_ERROR",
    payload: {
        error
    }
});

export let getTicketsFromServer = () => (dispatch, getState) =>{
        // Показываем прелоадер
        dispatch(_loadTickets());
        // Будто забираем с сервера
        setTimeout(() => {
            dispatch(_ticketsLoadingSuccess(tickets.flights));
        }, 100)
}


export default (state = initState, action) => {
    switch (action.type) {
        case "LOAD_TICKETS":
            return {
                ...state,                
                loading:true,
                error:null
            };
         case "TICKETS_LOADING_SUCCESS":
            return {
                data: action.payload.tickets,
                loading:false,
                error:null
            }
         case "TICKETS_LOADING_ERROR":
            return {
                loading:false,
                error: action.payload.error
            }     
        default: 
            return state; 
    }
}