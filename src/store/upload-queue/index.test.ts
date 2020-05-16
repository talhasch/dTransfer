import reducer, {
    addAct,
    deleteItemAct,
    startAct
} from "./index";

import {State, initialState} from './types';

let state: State = initialState;

it('1- default state', () => {
    expect(state).toMatchSnapshot();
});

it('2- add to queue', () => {
    const files = [
        new File([new ArrayBuffer(10)], 'document.pdf', {lastModified: 1589567882559}),
        new File([new ArrayBuffer(10)], 'sheet.xls', {lastModified: 1589567882559})
    ];

    state = reducer(state, addAct(files));
    expect(state).toMatchSnapshot();
});


it('3- add to queue', () => {
    const files = [
        new File([new ArrayBuffer(10)], 'document.pdf', {lastModified: 1589567882559}),
        new File([new ArrayBuffer(10)], 'sheet.xls', {lastModified: 1589567882559}),
        new File([new ArrayBuffer(10)], 'image.jpg', {lastModified: 1589567882559})
    ];

    state = reducer(state, addAct(files));
    expect(state).toMatchSnapshot();
});


it('4- delete item from queue', () => {
    state = reducer(state, deleteItemAct('sheet.xls-10-1589567882559'));
    expect(state).toMatchSnapshot();
});

it('5- start', () => {
    state = reducer(state, startAct());
    expect(state).toMatchSnapshot();
});
