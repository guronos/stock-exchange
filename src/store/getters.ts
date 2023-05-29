import { State } from './types';

export const showOrdersAsks = (state: State): string[][] => state.itemsAsks;
export const showOrdersBids = (state: State): string[][] => state.itemsBids;
export const showTikers = (state: State): string => state.tikersRest;
export const showUserOrdersAsks = (state: State): string[] => state.userAsks;
export const showUserOrdersBids = (state: State): string[] => state.userBids;
