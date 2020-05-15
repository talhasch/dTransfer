import React, {Component} from 'react';

import Bg from './bg';
import UserForm from './user-form';

import '../style/style.scss';

export default class AppPage extends Component {
    render() {
        return <>
            <Bg/>
            <UserForm />
        </>
    }
}
