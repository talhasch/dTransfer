import {Dispatch} from 'redux';

import {makeFileId} from '../../helper';

import {State, initialState, Action, AddAction, ItemDeleteAction, ActionTypes, Item, ItemStatus} from './types';

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionTypes.ADD: {
            const {files} = action;
            const {list} = state;

            const newItems = files
                .filter(f => list.find(x => x.id === makeFileId(f)) === undefined) // ignore files that already exist in store
                .map((x): Item => ({id: makeFileId(x), obj: x, status: ItemStatus.READY, progress: 0, error: '', url: ''}));

            return {...state, list: [...newItems, ...list]};
        }
        case ActionTypes.ITEM_DELETE: {
            const {list} = state;
            const {id} = action;

            return {...state, list: [...list.filter(x => x.id !== id)]};
        }
        default: {
            return state;
        }
    }
}


/* Actions */
export const addToUploadQueue = (files: Array<File>) => (dispatch: Dispatch) => {
    dispatch(addAct(files));
};

export const deleteUploadQueueItem = (id: string) => (dispatch: Dispatch) => {
    dispatch(deleteItemAct(id));
};

/* Action Creators */
export const addAct = (files: Array<File>): AddAction => {
    return {
        type: ActionTypes.ADD,
        files
    };
};

export const deleteItemAct = (id: string): ItemDeleteAction => {
    return {
        type: ActionTypes.ITEM_DELETE,
        id
    }
};
