import { State, DataResponseRest, DataResponseStream, DataItem } from './types';

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
  dataFromRest.asks.forEach((element: string[]): void=>{state.itemsAsks.push({
    price : element[0],
    quantity : element[1]
  })});
  dataFromRest.bids.forEach((element: string[]): void=>{state.itemsBids.push({
    price : element[0],
    quantity : element[1]
  })});
  state.userAsks.push(dataFromRest.asks[2][0]);
  state.userAsks.push(dataFromRest.asks[3][0]);
  state.userBids.push(dataFromRest.bids[3][0]);
  state.userBids.push(dataFromRest.bids[4][0]);
};

export const saveDataFromStream = (state: State, dataFromStream: DataResponseStream): void => {
  function deleteDubles(dataPricesForStrem: string[][], currentItemsPrices: Array<DataItem>, sort: string): void {
    const resaultItems: Array<DataItem> = [];

    dataPricesForStrem?.forEach((element: string[]): void => {
      let elementFound = false;
      if (Number(element[1]) === 0) {
        currentItemsPrices.forEach((currentElement, currentIndx) => {
          if (element[0] == currentElement.price) {
            currentItemsPrices.splice(currentIndx, 1);
          }
        });
      } else {
        currentItemsPrices.forEach((currentElement, currentIndx) => {
          if (element[0] == currentElement.price) {
            currentItemsPrices.splice(currentIndx, 1, {
              price : element[0],
              quantity : element[1]
            });
            elementFound = true;
          }
        });
        if (!elementFound) {
          resaultItems.push({
            price : element[0],
            quantity : element[1]
          });
        }
      }
    });
    currentItemsPrices.forEach((i: DataItem): void => {
      resaultItems.push(i);
    });
    if (sort === 'down') {
      const sortItem = resaultItems.sort((a, b) => Number(a.price) - Number(b.price));
      state.itemsAsks = sortItem.splice(0, Number(state.limit));
    } else {
      const sortItem = resaultItems.sort((a, b) => Number(b.price) - Number(a.price));
      state.itemsBids = sortItem.splice(0, Number(state.limit));
    }
  }
  deleteDubles(dataFromStream.a, state.itemsAsks, 'down');
  deleteDubles(dataFromStream.b, state.itemsBids, 'up');
};

export const closeStream = (state: State): void => {
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
    state.tikersWS = '';
    state.limit = ''
    state.haveResponseData = false;
    state.errorMessage = 0;
  } else {
    state.runStream = false;
    state.connect = false;
    state.countAttempts = 0;
    state.haveResponseData = false;
    state.errorMessage = 0;
    state.tikersRest = '';
    state.tikersWS = '';
    state.limit = ''
  }
};
