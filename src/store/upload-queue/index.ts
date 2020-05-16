import {Dispatch} from 'redux';

import {makeFileId, readFileBuffer} from '../../helper';

import {AppState} from '../index';

import {Action, ActionTypes, AddAction, initialState, Item, ItemDeleteAction, ItemStartAction, ItemStatus, StartAction, State} from './types';

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
        case ActionTypes.START: {
            return {...state, inProgress: true};
        }
        case ActionTypes.ITEM_DELETE: {
            const {list} = state;
            const {id} = action;

            return {...state, list: [...list.filter(x => x.id !== id)]};
        }
        case ActionTypes.ITEM_START: {
            const {list} = state;
            const {id} = action;

            const newList = list.map(x => {
                if (x.id !== id) return x;

                return {...x, status: ItemStatus.IN_PROGRESS}
            });

            return {...state, list: [...newList]};
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

export const startUploadQueue = () => async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(startAct());

    while (true) {
        const {uploadQueue: queue} = getState();
        const item = queue.list.find(x => x.status === ItemStatus.READY);
        if (item === undefined) {
            break;
        }

        dispatch(itemStartAct(item.id));

        const buffer = readFileBuffer(item.obj);
    }
};

export const deleteUploadQueueItem = (id: string) => (dispatch: Dispatch) => {
    dispatch(itemDeleteAct(id));
};

/* Action Creators */
export const addAct = (files: Array<File>): AddAction => {
    return {
        type: ActionTypes.ADD,
        files
    };
};

export const startAct = (): StartAction => {
    return {
        type: ActionTypes.START
    }
};

export const itemDeleteAct = (id: string): ItemDeleteAction => {
    return {
        type: ActionTypes.ITEM_DELETE,
        id
    }
};

export const itemStartAct = (id: string): ItemStartAction => {
    return {
        type: ActionTypes.ITEM_START,
        id
    }
};



