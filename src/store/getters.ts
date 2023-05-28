import { State } from './types';

export const showOrdersAsks = (state: State) => state.itemsAsks;
export const showOrdersBids = (state: State) => state.itemsBids;
export const showTikers = (state: State) => state.tikersRest;
export const showUserOrdersAsks = (state: State) => state.userAsks;
export const showUserOrdersBids = (state: State) => state.userBids;
