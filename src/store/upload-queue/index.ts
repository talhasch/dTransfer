import {Dispatch} from 'redux';

import {makeFileId} from '../../helper';

import {State, initialState, Action, AddAction, ResetAction, ActionTypes, Item, ItemStatus} from './types';

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionTypes.ADD:
            const {files} = action;
            const {list} = state;

            const newList = files
                .filter(f => list.find(x => x.id === makeFileId(f)) === undefined) // ignore files that already exist in store
                .map((x): Item => ({id: makeFileId(x), obj: x, status: ItemStatus.READY, progress: 0}));

            return {...state, list: [...list, ...newList]};
        case ActionTypes.RESET:
            return initialState;
        default: {
            return state;
        }
    }
}


/* Actions */
export const addToUploadQueue = (files: Array<File>) => (dispatch: Dispatch) => {
    dispatch(addAct(files));
};

export const resetUploadQueue = () => (dispatch: Dispatch) => {
    dispatch(resetAct());
};

/* Action Creators */
export const addAct = (files: Array<File>): AddAction => {
    return {
        type: ActionTypes.ADD,
        files
    };
};

export const resetAct = (): ResetAction => {
    return {
        type: ActionTypes.RESET,
    }
};
