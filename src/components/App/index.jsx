import React, {Component} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

//Корневой файл стилей
import 'bootstrap/dist/css/bootstrap.min.css'

//Экшн на получение данных с сервера
import {getTicketsFromServer} from 'reducers/tickets.js'

//Дочерние компоненты

import Table from './Table';

import Filter from './Filter';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(getTicketsFromServer());
    }

    renderContent = () => {
        let {loading} = this.props;

        //Программа не имеет функциональности пока нет данных

        if (loading) {
            return (
                <div className="preloader">
                    Loading...
                </div>
            )
        } else {
            return (
                <div className="content">
                    <div className="col-lg-8 col-lg-offset-2">
                        <Filter/>
                    </div>
                    <div className="col-lg-8 col-lg-offset-2">
                        <Table/>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                {this.renderContent()}
            </div>

        );
    }
}

let getProps = state => ({
    loading: state.tickets.loading
})

App.propTypes = {
    loading: propTypes.bool
}
export default connect(getProps)(App);