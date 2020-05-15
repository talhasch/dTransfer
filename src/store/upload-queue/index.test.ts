import reducer, {
    setAct,
    resetAct
} from "./index";

import {State, initialState} from './types';

let state: State = initialState;

it('1- default state', () => {
    expect(state).toMatchSnapshot();
});

it('2- set queue', () => {
    const files = [
        new File([new ArrayBuffer(10)], 'document.pdf'),
        new File([new ArrayBuffer(10)], 'sheet.xls')
    ];

    state = reducer(state, setAct(files));
    expect(state).toMatchSnapshot();
});


it('3- reset queue', () => {
    state = reducer(state, resetAct());
    expect(state).toMatchSnapshot();
});
