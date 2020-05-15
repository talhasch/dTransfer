import React, {Component} from 'react';

import Bg from './bg';
import UserForm from './user-form';

import 'typeface-ibm-plex-sans';
import '../style/style.scss';


export default class AppPage extends Component {

    highlight = () => {
        const el = document.querySelector('.wrapper');
        if (el) {
            el.classList.add('highlighted');
        }
    };

    unHighlight = () => {
        const el = document.querySelector('.wrapper');
        if (el) {
            el.classList.remove('highlighted');
        }
    };

    dragEnter = () => {
        this.highlight();
    };

    dragLeave = () => {
        this.unHighlight();
    };

    dragOver = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();
    };


    drop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.unHighlight();

        const {files} = e.dataTransfer;

        if (files.length === 0) {
            return;
        }
        console.log(files)
    };

    render() {
        return <div className="wrapper" onDragEnter={this.dragEnter} onDragOver={this.dragOver}>
            <div className="drop-zone" onDrop={this.drop} onDragLeave={this.dragLeave}></div>
            <Bg/>
            <UserForm/>
        </div>
    }
}
