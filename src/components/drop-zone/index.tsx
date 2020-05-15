import React, {Component} from 'react';

interface DropZoneProps {
    setUploadQueue: (files: Array<File>) => any
}

export default class DropZone extends Component<DropZoneProps> {
    componentDidMount(): void {
        const root = document.querySelector('#root');
        if (!root) return;
        root.addEventListener('dragenter', this.dragEnter);
    }

    componentWillUnmount(): void {
        const root = document.querySelector('#root');
        if (!root) return;
        root.removeEventListener('dragenter', this.dragEnter);
    }

    bringToFront = () => {
        const el = document.querySelector('.drop-zone');
        if (el) {
            el.classList.add('visible');
        }
    };

    sentToBack = () => {
        const el = document.querySelector('.drop-zone');
        if (el) {
            el.classList.remove('visible');
        }
    };

    dragEnter = () => {
        this.bringToFront();
    };

    dragLeave = () => {
        this.sentToBack();
    };

    dragOver = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();
    };

    drop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.sentToBack();

        if (e.dataTransfer.files.length === 0) {
            return;
        }

        const files: Array<File> = [];
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            files.push(e.dataTransfer.files[i]);
        }

        this.props.setUploadQueue(files);
    };

    render() {
        return <div className="drop-zone"
                    onDrop={this.drop}
                    onDragLeave={this.dragLeave}
                    onDragOver={this.dragOver}>
            Drop files here
        </div>;
    }
}
