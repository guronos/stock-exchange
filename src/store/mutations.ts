import { State, DataResponseRest, DataResponseStream } from './types';

export const saveTikersAndConnect = (state: State, tikersData: string[]): void => {
  const [tikers, quantityOrders] = tikersData
  state.tikersRest = tikers.toUpperCase();
  state.tikersWS = tikers.toLowerCase();
  state.limit = quantityOrders
  state.connect = true;
};

export const saveDataFromRest = (state: State, dataFromRest: DataResponseRest): void => {
  state.lastUpdateId = dataFromRest.lastUpdateId;
  state.haveResponseData = true;
  state.itemsAsks = dataFromRest.asks;
  state.itemsBids = dataFromRest.bids;
  state.userAsks.push(dataFromRest.asks[2][0]);
  state.userAsks.push(dataFromRest.asks[3][0]);
  state.userBids.push(dataFromRest.bids[3][0]);
  state.userBids.push(dataFromRest.bids[4][0]);
};

export const saveDataFromStream = (state: State, dataFromStream: DataResponseStream): void => {
  function deleteDubles(dataPricesForStrem: string[][], currentItemsPrices: string[][], sort: string): void {
    const resaultItems: string[][] = [];

    dataPricesForStrem?.forEach((element: string[]) => {
      let elementFound = false;
      if (Number(element[1]) === 0) {
        currentItemsPrices.forEach((currentElement, currentIndx) => {
          if (element[0] == currentElement[0]) {
            currentItemsPrices.splice(currentIndx, 1);
          }
        });
      } else {
        currentItemsPrices.forEach((currentElement, currentIndx) => {
          if (element[0] == currentElement[0]) {
            currentItemsPrices.splice(currentIndx, 1, element);
            elementFound = true;
          }
        });
        if (!elementFound) {
          resaultItems.push(element);
        }
      }
    });
    currentItemsPrices.forEach((i: string[]): void => {
      resaultItems.push([i[0], i[1]]);
    });
    if (sort === 'down') {
      const sortItem = resaultItems.sort((a, b) => Number(a[0]) - Number(b[0]));
      state.itemsAsks = sortItem.splice(0, Number(state.limit));
    } else {
      const sortItem = resaultItems.sort((a, b) => Number(b[0]) - Number(a[0]));
      state.itemsBids = sortItem.splice(0, Number(state.limit));
    }
  }
  deleteDubles(dataFromStream.a, state.itemsAsks, 'down');
  deleteDubles(dataFromStream.b, state.itemsBids, 'up');
};

export const closeStream = (state: State) => {
  if (state.socket) {
    state.socket.close();
    state.runStream = false;
    state.itemsStream = [];
    state.itemsAsks = [];
    state.itemsBids = [];
    state.userAsks = [];
    state.userBids = [];
    state.connect = false;
    state.countAttempts = 0;
    state.lastUpdateId = '';
    state.tikersRest = '';
    state.haveResponseData = false;
    state.errorMessage = 0;
  } else {
    state.runStream = false;
    state.connect = false;
    state.countAttempts = 0;
    state.haveResponseData = false;
    state.errorMessage = 0;
  }
};
