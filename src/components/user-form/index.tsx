/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

import {State as UploadQueueState} from '../../store/upload-queue/types';

import plusSvg from '../../images/plus.svg';


interface UserFormProps {
    addToUploadQueue: (files: Array<File>) => any,
    uploadQueue: UploadQueueState
}

type FileInputEvent = React.FormEvent & { target: { files: FileList } };

export default class UserForm extends Component<UserFormProps> {

    openFileInput = () => {
        const el: HTMLInputElement | null = document.querySelector('#file-input');
        if (!el) return;
        el.click();
    };

    openFolderInput = () => {
        const el: HTMLInputElement | null = document.querySelector('#folder-input');
        if (!el) return;
        el.click();
    };

    folderInputChanged = (e: FileInputEvent) => {
        const files: FileList = e.target.files;
        this.handleFiles(files);
    };

    fileInputChanged = (e: FileInputEvent) => {
        const files: FileList = e.target.files;
        this.handleFiles(files);
    };

    handleFiles = (list: FileList) => {
        if (list.length === 0) {
            return;
        }

        const files: Array<File> = [];
        for (let i = 0; i < list.length; i++) {
            files.push(list[i]);
        }

        this.props.addToUploadQueue(files);
    };

    render() {
        // @ts-ignore
        const fileInput = <input type="file" id="file-input" multiple onChange={this.fileInputChanged}/>;
        // @ts-ignore
        const folderInput = <input type="file" id="folder-input" directory="" webkitdirectory="" onChange={this.folderInputChanged}/>;

        return (
            <div className="user-form">
                <div className="upload-controls">
                    <div className="source-selectors" onClick={this.openFileInput}>
                        <div className="button-file-selector">
                            <Button variant="primary" size="sm">
                                <img src={plusSvg} alt="Plus"/>
                            </Button>
                        </div>
                        <div className="text-selectors">
                            <div className="text-file-selector">
                                Add files
                            </div>
                            <div className="text-folder-selector">
                                <a href="#" onClick={(e: React.MouseEvent<HTMLElement>) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.openFolderInput();
                                }}>Or select a folder</a>
                            </div>
                        </div>
                    </div>
                    <div className="upload-button">
                        <Button variant="secondary" disabled>Upload</Button>
                    </div>
                </div>

                {fileInput}
                {folderInput}
            </div>
        )
    }
}
