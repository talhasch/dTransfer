import {Dispatch} from 'redux';

import {makeFileId, readFileBuffer} from '../../helper';

import {arrayChunk} from '../../util';

import {upload} from '../../backend';

import {AppState} from '../index';

import {
    State,
    Actions,
    ActionTypes,
    Item,
    ItemStatus,
    AddAction,
    StartAction,
    FinishAction,
    ItemDeleteAction,
    ItemProgressAction,
    ItemStartAction,
    ItemFinishAction
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
            const {id} = action;

            const newList = list.map(x => x.id === id ? {...x, status: ItemStatus.DONE} : x);

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

        dispatch(itemFinishAct(item.id));

    };

    dispatch(startAct());
    const {uploadQueue: queue} = getState();

    const chunks: Array<Array<Item>> = arrayChunk(queue.list, 4);

    for (let x = 0; x < chunks.length; x++) {
        const ps = chunks[x].map(x => uploadItem(x).catch(x => x));
        await Promise.all(ps);
    }

    dispatch(finishAct());

    /*
    while (true) {
        const {uploadQueue: queue} = getState();
        const item = queue.list.find(x => x.status === ItemStatus.READY);
        if (item === undefined) {
            break;
        }

        dispatch(itemStartAct(item.id));
        let buffer;

        try {
            buffer = await readFileBuffer(item.obj);
        } catch (e) {
            console.log(e)
            continue;
        }



        const url = await upload(buffer, item.obj.name, (progress) => {
            dispatch(itemProgressAct(item.id, progress));
        }); // TODO: try-catch

        console.log(url)
    }

     */
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

export const itemFinishAct = (id: string): ItemFinishAction => {
    return {
        type: ActionTypes.ITEM_FINISH,
        id
    }
};




