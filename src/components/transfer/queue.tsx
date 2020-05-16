import React, {Component} from 'react';

import fileSize from 'filesize';

import {Item, ItemStatus, State as UploadQueueState} from '../../store/upload-queue/types';

import {closeSvg, checkSvg} from '../../svg';

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
        const {list, inProgress} = uploadQueue;
        if (list.length === 0) {
            return null;
        }

        return <div className="queue">
            {list.map((i) => {
                const progress = i.status === ItemStatus.IN_PROGRESS ? `${i.progress}%` : '0px';

                return <div key={i.id} className={`item ${i.status === ItemStatus.IN_PROGRESS ? 'in-progress' : ''}`}>
                    <div className="item-progress" style={{width: progress}}/>
                    <div className="item-content">
                        <div className="item-info">
                            <div className="name">{i.obj.name}</div>
                            <span className="size">{fileSize(i.obj.size)}</span>
                            {(i.status === ItemStatus.IN_PROGRESS && i.progress === 100) && <span className="processing">processing</span>}
                        </div>
                        <div className="item-controls">
                            {(() => {
                                if (i.status === ItemStatus.READY) {
                                    if (!inProgress) {
                                        return <div
                                            className="item-control item-control-delete"
                                            onClick={() => {
                                                this.delete(i);
                                            }}>{closeSvg}</div>
                                    }
                                }

                                if (i.status === ItemStatus.DONE) {
                                    return <div className="item-control">{checkSvg}</div>
                                }

                                if (i.status === ItemStatus.ERROR) {

                                }

                                return null;
                            })()}
                        </div>
                    </div>
                </div>
            })}
        </div>
    }
}
