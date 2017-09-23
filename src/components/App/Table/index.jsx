import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TableRow = ({
    direction: {
        from,
        to
    },
    arrival,
    departure,
    carrier
}) => {
    return(
        <tr>
            <td>{from}</td>
            <td>{to}</td>
            <td>{arrival}</td>
            <td>{departure}</td>
            <td>{carrier}</td>
        </tr>)
}
//таблицей будет глупый компонент с вспомогательной функцией рендера строк
const Table = ({
    tickets,
    filter
}) => {
    return (
        <table className = "table">
            <thead>
                <tr>
                   <th>Откуда</th> 
                   <th>Куда</th> 
                   <th>Вылет</th> 
                   <th>Прилет</th> 
                   <th>Авиакомпания</th>
                </tr>
            </thead>
            <tbody>
                {renderRows(tickets, filter)}
            </tbody>
            
        </table>
    );
};

//Вспомогательная функция для рендера строк таблицы в соответствии выбранному фильтру
let renderRows = (rows, filter) => {
    //Так как у нас имеются id от API то подсталяем их как свойство key каждой строки
    if (filter === "Все авиакомпании") {
        return rows.map((el) => <TableRow {...el} key = {el.id}/>)    
    } else {
        return rows
            .filter(el => el.carrier === filter)
            .map(el => <TableRow {...el} key={el.id}/>)
    }
}

//Оставляем взаимодействие со стором наиболее простым, в противном случае нам придется использовать reselect
let getProps = state => ({
    tickets: state.tickets.data,
    filter:state.filter.filterValue
});

Table.propTypes = {
    tickets:PropTypes.array,
    filter:PropTypes.string
}
export default connect(getProps)(Table);