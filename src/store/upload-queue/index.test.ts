import reducer, {
    addAct,
    resetAct
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


it('9- reset queue', () => {
    state = reducer(state, resetAct());
    expect(state).toMatchSnapshot();
});
