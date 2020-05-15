import {bindActionCreators, Dispatch, AnyAction} from 'redux';
import {connect} from 'react-redux';

import {AppState} from './store';

import {addToUploadQueue} from './store/upload-queue';

import AppPage from './components';

const mapStateToProps = (state: AppState) => ({
    ...state,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            addToUploadQueue
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppPage);


