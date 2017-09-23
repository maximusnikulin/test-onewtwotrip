import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Импортируем экшн на смену фильтра
import { changeFilter } from 'reducers/filter'

class Filter extends Component {
    state = {
        options:[]
    }
    _getFilterOptions = () => {
        let collection, 
            {tickets} = this.props;                
            //Ищем уникальные элеметы путем создания временной коллекции
            collection= {
                "Все авиакомпании": true
            },

        tickets.forEach(el => collection[el.carrier] = true);

        return Object.keys(collection);
    }
    _handleChangeFilter = (e) => {
        let { dispatch } = this.props;

        dispatch(changeFilter(e.target.value))
    }
    _renderOptions = () => {
        //Авиакомпаний не много поэтому ключами будут индексы массива
        return this.state.options.map((el, index) => <option value = {el} key = {index}>{el}</option>)
    }
    componentDidMount() {        
        this.setState({
            options:this._getFilterOptions()
        })
    }        
    render() {
        return (
            <div className = "filter">
                <div className="form-group">
                    <select className = "form-control" onChange = {this._handleChangeFilter}>
                        {this._renderOptions()}
                    </select>
                </div>
            </div>
        );
    }
}

let getProps = (state) => ({    
    tickets:state.tickets.data
});

Filter.propTypes = {
    tickets:PropTypes.array
}
export default connect(getProps)(Filter);