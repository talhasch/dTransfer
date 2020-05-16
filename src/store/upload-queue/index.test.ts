import reducer, {
    initialState,
    addAct,
    itemDeleteAct,
    startAct,
    finishAct,
    itemStartAct,
    itemProgressAct,
    itemFinishAct,
    itemErrorAct
} from "./index";

import {State} from './types';

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
    state = reducer(state, itemDeleteAct('sheet.xls-10-1589567882559'));
    expect(state).toMatchSnapshot();
});

it('5- start', () => {
    state = reducer(state, startAct());
    expect(state).toMatchSnapshot();
});

it('6- item start', () => {
    state = reducer(state, itemStartAct('image.jpg-10-1589567882559'));
    expect(state).toMatchSnapshot();
});

it('7- item progress', () => {
    state = reducer(state, itemProgressAct('image.jpg-10-1589567882559', 11));
    expect(state).toMatchSnapshot();
});

it('8- item finish', () => {
    state = reducer(state, itemFinishAct('image.jpg-10-1589567882559'));
    expect(state).toMatchSnapshot();
});

it('9- item start', () => {
    state = reducer(state, itemStartAct('document.pdf-10-1589567882559'));
    expect(state).toMatchSnapshot();
});

it('10- item error', () => {
    state = reducer(state, itemErrorAct('document.pdf-10-1589567882559', "Couldn't read file"));
    expect(state).toMatchSnapshot();
});

it('52- finish', () => {
    state = reducer(state, finishAct());
    expect(state).toMatchSnapshot();
});
