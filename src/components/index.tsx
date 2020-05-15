import React, {Component} from 'react';

import Bg from './bg';
import UserForm from './user-form';
import DropZone from './drop-zone';

import 'typeface-ibm-plex-sans';

import '../style/style.scss';

export default class AppPage extends Component {
    render() {
        return <>
            <DropZone {...this.props} />
            <Bg {...this.props} />
            <UserForm {...this.props} />
        </>
    }
}
