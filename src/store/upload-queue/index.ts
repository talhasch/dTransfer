import {State, Action, SetAction, ActionTypes, Item, ItemStatus} from './types';

import {Dispatch} from 'redux';

const initialState: State = {
    list: [],
    inProgress: false
};

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

/* Action Creators */
export const setAct = (files: Array<File>): SetAction => {
    return {
        type: ActionTypes.SET,
        files
    };
};
