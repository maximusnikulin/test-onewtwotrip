var initState = {
    filterValue: "Все авиакомпании"
}
export let changeFilter = (value) => ({
    type:"CHANGE_FILTER",
    filterValue:value
})

//Оставляем редьссеры максимально простыми
export default (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_FILTER":
            return {
                filterValue: action.filterValue
            };         
        default: 
            return state; 
    }
}