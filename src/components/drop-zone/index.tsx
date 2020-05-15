import React, {Component} from 'react';

export default class DropZone extends Component {
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

        const {files} = e.dataTransfer;

        if (files.length === 0) {
            return;
        }

        console.log(files)
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
