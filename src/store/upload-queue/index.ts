import {Dispatch} from 'redux';

import {makeFileId, readFileBuffer} from '../../helper';

import {arrayChunk} from '../../util';

import {upload} from '../../backend';

import {AppState} from '../index';

import {
    Actions,
    ActionTypes,
    AddAction,
    FinishAction,
    Item,
    ItemDeleteAction,
    ItemErrorAction,
    ItemFinishAction,
    ItemProgressAction,
    ItemStartAction,
    ItemStatus,
    StartAction,
    State
} from './types';

export const initialState: State = {
    list: [],
    inProgress: false
};

export default (state: State = initialState, action: Actions): State => {
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
        case ActionTypes.FINISH: {
            return {...state, inProgress: false};
        }
        case ActionTypes.ITEM_DELETE: {
            const {list} = state;
            const {id} = action;

            return {...state, list: [...list.filter(x => x.id !== id)]};
        }
        case ActionTypes.ITEM_START: {
            const {list} = state;
            const {id} = action;

            const newList = list.map(x => x.id === id ? {...x, status: ItemStatus.IN_PROGRESS} : x);

            return {...state, list: [...newList]};
        }
        case ActionTypes.ITEM_PROGRESS: {
            const {list} = state;
            const {id, val} = action;

            const newList = list.map(x => x.id === id ? {...x, progress: val} : x);

            return {...state, list: [...newList]};
        }
        case ActionTypes.ITEM_FINISH: {
            const {list} = state;
            const {id, url} = action;

            const newList = list.map(x => x.id === id ? {...x, status: ItemStatus.DONE, url} : x);

            return {...state, list: [...newList]};
        }
        case ActionTypes.ITEM_ERROR: {
            const {list} = state;
            const {id, message} = action;

            const newList = list.map(x => x.id === id ? {...x, status: ItemStatus.ERROR, error: message} : x);

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

    const uploadItem = async (item: Item) => {
        dispatch(itemStartAct(item.id));

        let buffer;

        try {
            buffer = await readFileBuffer(item.obj);
        } catch (e) {
            dispatch(itemErrorAct(item.id, "Couldn't read file"));
            return;
        }

        let url;
        try {
            url = await upload(buffer, item.obj.name, (progress) => {
                dispatch(itemProgressAct(item.id, progress));
            });
        } catch (e) {
            dispatch(itemErrorAct(item.id, 'Upload error'));
            return;
        }

        dispatch(itemFinishAct(item.id, url));
    };

    dispatch(startAct());
    const {uploadQueue: queue} = getState();

    const chunks: Array<Array<Item>> = arrayChunk(queue.list, 4);

    for (let x = 0; x < chunks.length; x++) {
        const ps = chunks[x].map(x => uploadItem(x).catch(x => x));
        await Promise.all(ps);
    }

    dispatch(finishAct());
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

export const finishAct = (): FinishAction => {
    return {
        type: ActionTypes.FINISH
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

export const itemProgressAct = (id: string, val: number): ItemProgressAction => {
    return {
        type: ActionTypes.ITEM_PROGRESS,
        id,
        val
    }
};

export const itemFinishAct = (id: string, url: string): ItemFinishAction => {
    return {
        type: ActionTypes.ITEM_FINISH,
        id,
        url
    }
};

export const itemErrorAct = (id: string, message: string): ItemErrorAction => {
    return {
        type: ActionTypes.ITEM_ERROR,
        id,
        message
    }
};




