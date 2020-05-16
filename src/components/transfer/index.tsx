/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';

import {Button, Spinner} from 'react-bootstrap';

import {State as UploadQueueState} from '../../store/upload-queue/types';

import Queue from './queue';
import UploaderForm from './upload-form';

interface UserFormProps {
    addToUploadQueue: (files: Array<File>) => any,
    startUploadQueue: () => any,
    deleteUploadQueueItem: (id: string) => any,
    uploadQueue: UploadQueueState
}

export default class Transfer extends Component<UserFormProps> {
    start = async () => {
        await this.props.startUploadQueue();
        // console.log("done")
    };

    render() {
        const {uploadQueue} = this.props;
        const {inProgress} = uploadQueue;

        return (
            <div className="transfer">
                <UploaderForm {...this.props} />
                <Queue {...this.props} />
                <div className="transfer-action">
                    <Button variant="secondary"
                            disabled={uploadQueue.list.length === 0 || inProgress}
                            className="btn-upload"
                            onClick={this.start}>
                        {inProgress && <div className="loading"><Spinner animation="border" size="sm"/></div>}
                        Upload
                    </Button>
                </div>
            </div>
        )
    }
}
