import React, {Component} from 'react';

import Bg from './bg';
import UserForm from './user-form';
import DropZone from './drop-zone';

import 'typeface-ibm-plex-sans';

import '../style/style.scss';

interface AppPageProps {
    setUploadQueue: (files: Array<File>) => any
}


export default class AppPage extends Component<AppPageProps> {
    render() {

        return <>
            <DropZone {...this.props} />
            <Bg {...this.props} />
            <UserForm {...this.props} />
        </>
    }
}
