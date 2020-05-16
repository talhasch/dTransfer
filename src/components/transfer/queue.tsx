import React, {Component} from 'react';
import {State as UploadQueueState} from '../../store/upload-queue/types';

interface QueueProps {
    uploadQueue: UploadQueueState
}

export default class Queue extends Component<QueueProps> {
    render() {
        const {uploadQueue} = this.props;
        const {list} = uploadQueue;
        if (list.length === 0) {
            return null;
        }


        return <div className="queue">
            {list.map((i) => {
                return <div key={i.id} className="item">
                    <div className="item-info">
                        <div className="item-name">
                            {i.obj.name}
                        </div>
                    </div>
                </div>
            })}
        </div>
    }
}
