export enum ActionTypes {
    ADD = '@files/ADD',
    START = '@files/START',
    FINISH = '@files/FINISH',
    ITEM_DELETE = '@files/ITEM_DELETE',
    ITEM_START = '@files/ITEM_START',
    ITEM_PROGRESS = '@files/ITEM_PROGRESS',
    ITEM_FINISH = '@files/ITEM_FINISH',
    ITEM_ERROR = '@files/ITEM_ERROR',
}

interface BaseAction {
    type: ActionTypes
}

export interface AddAction extends BaseAction {
    type: ActionTypes.ADD;
    files: Array<File>;
}

export interface StartAction extends BaseAction {
    type: ActionTypes.START
}

export interface FinishAction extends BaseAction {
    type: ActionTypes.FINISH
}

export interface ItemDeleteAction extends BaseAction {
    type: ActionTypes.ITEM_DELETE,
    id: string
}

export interface ItemStartAction extends BaseAction {
    type: ActionTypes.ITEM_START,
    id: string
}

export interface ItemProgressAction extends BaseAction {
    type: ActionTypes.ITEM_PROGRESS,
    id: string,
    val: number
}

export interface ItemFinishAction extends BaseAction {
    type: ActionTypes.ITEM_FINISH,
    id: string,
    url: string
}

export interface ItemErrorAction extends BaseAction {
    type: ActionTypes.ITEM_ERROR,
    id: string,
    message: string
}

export type Actions = AddAction | StartAction | FinishAction | ItemDeleteAction | ItemStartAction | ItemProgressAction | ItemFinishAction | ItemErrorAction;


export interface Item {
    id: string,
    obj: File,
    status: ItemStatus,
    progress: number,
    error: string,
    url: string
}

export enum ItemStatus {
    READY = 1,
    IN_PROGRESS = 2,
    DONE = 3,
    ERROR = 4
}


export interface State {
    list: Array<Item>,
    inProgress: boolean
}

