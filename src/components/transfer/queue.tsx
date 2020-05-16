import React, {Component} from 'react';

import fileSize from 'filesize';

import {State as UploadQueueState, Item} from '../../store/upload-queue/types';

import {closeSvg} from '../../svg';

interface QueueProps {
    deleteUploadQueueItem: (id: string) => any
    uploadQueue: UploadQueueState
}

export default class Queue extends Component<QueueProps> {

    delete = (item: Item) => {
        const {deleteUploadQueueItem} = this.props;
        deleteUploadQueueItem(item.id);
    };

    render() {
        const {uploadQueue} = this.props;
        const {list} = uploadQueue;
        if (list.length === 0) {
            return null;
        }

        return <div className="queue">
            {list.map((i) => {
                return <div key={i.id} className="item">
                    <div className="item-name">{i.obj.name}</div>
                    <div className="item-size">{fileSize(i.obj.size)}</div>
                    <div className="item-controls">
                        <div className="item-control item-control-delete"
                             onClick={() => {
                                 this.delete(i);
                             }}>{closeSvg}</div>
                    </div>
                </div>
            })}
        </div>
    }
}
