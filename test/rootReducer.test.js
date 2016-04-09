import expect from 'expect';
import rootReducer from '../js/reducers/rootReducer';

// Test Reducer
describe('rootReducer', () => {
  it('component reducers have been installed', () => {
    let initialState = rootReducer(undefined, {});

    expect(initialState.filter).toExist();
    expect(initialState.data).toExist();
    expect(initialState.network).toEqual(null);
  });
});
