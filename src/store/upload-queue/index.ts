import {Dispatch} from 'redux';

import {State, initialState, Action, AddAction, ResetAction, ActionTypes, Item, ItemStatus} from './types';

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionTypes.ADD:
            const {files} = action;
            const {list} = state;

            const newList = files.map((x): Item => (
                    {
                        id: `${x.name}-${x.size}-${x.lastModified}`,
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
