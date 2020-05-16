/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

import {plusSvg} from '../../svg';

interface UploadFormProps {
    addToUploadQueue: (files: Array<File>) => any
}

type FileInputEvent = React.FormEvent & { target: { files: FileList } };

export default class UploadForm extends Component<UploadFormProps> {

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
            <div className="upload-form" onClick={this.openFileInput}>
                <div>
                    <Button variant="primary" size="sm" className="btn-select-files">
                        {plusSvg}
                    </Button>
                </div>
                <div className="text-controls">
                    <span className="select-files">
                        Add files
                    </span>
                    <a className="select-folders" href="#" onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openFolderInput();
                    }}>or select folders</a>
                </div>
                {fileInput}
                {folderInput}
            </div>
        )
    }
}
