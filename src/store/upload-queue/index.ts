import {Dispatch} from 'redux';

import {State, initialState, Action, SetAction, ResetAction, ActionTypes, Item, ItemStatus} from './types';

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionTypes.SET:
            const {files} = action;
            const newList = files.map((x, i): Item => (
                    {
                        id: i,
                        obj: x,
                        status: ItemStatus.READY,
                        progress: 0
                    }
                )
            );

            return {...state, list: newList};
        case ActionTypes.RESET:
            return initialState;
        default: {
            return state;
        }
    }
}


/* Actions */
export const setUploadQueue = (files: Array<File>) => (dispatch: Dispatch) => {
    dispatch(setAct(files));
};

export const resetUploadQueue = () => (dispatch: Dispatch) => {
    dispatch(resetAct());
};

/* Action Creators */
export const setAct = (files: Array<File>): SetAction => {
    return {
        type: ActionTypes.SET,
        files
    };
};

export const resetAct = (): ResetAction => {
    return {
        type: ActionTypes.RESET,
    }
};
