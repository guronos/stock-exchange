import { State, DataItem } from './types';

export const showOrdersAsks = (state: State): Array<DataItem> => state.itemsAsks;
export const showOrdersBids = (state: State): Array<DataItem> => state.itemsBids;
export const showTikers = (state: State): string => state.tikersRest;
export const showUserOrdersAsks = (state: State): string[] => state.userAsks;
export const showUserOrdersBids = (state: State): string[] => state.userBids;
