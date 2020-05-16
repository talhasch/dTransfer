/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

import {State as UploadQueueState} from '../../store/upload-queue/types';

import Queue from './queue';
import UploaderForm from './upload-form';

interface UserFormProps {
    addToUploadQueue: (files: Array<File>) => any,
    uploadQueue: UploadQueueState
}

export default class Transfer extends Component<UserFormProps> {
    render() {
        const {uploadQueue} = this.props;

        return (
            <div className="transfer">
                <UploaderForm {...this.props} />
                <Queue {...this.props} />
                <div className="transfer-action">
                    <Button variant="secondary" disabled={uploadQueue.list.length === 0} className="btn-upload">Upload</Button>
                </div>
            </div>
        )
    }
}
