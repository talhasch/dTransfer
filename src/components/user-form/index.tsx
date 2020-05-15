import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

import plusSvg from '../../images/plus.svg';

export default class UserForm extends Component {
    render() {
        return (
            <div className="user-form">
                <div className="upload-form">
                    <div className="form-controls">
                        <div className="button-control">
                            <Button variant="primary" size="sm">
                                <img src={plusSvg} alt="Plus"/>
                            </Button>
                        </div>
                        <div className="text-controls">
                            <div className="select-file">
                                Add files
                            </div>
                            <div className="select-folder">
                                Or select a folder
                            </div>
                        </div>
                    </div>
                    <div className="upload-button">
                        <Button variant="secondary" disabled>Upload</Button>
                    </div>
                </div>
            </div>
        )
    }
}
