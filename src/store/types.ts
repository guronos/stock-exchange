export interface State {
  API_URL_Rest: string;
  kindOfFlow: string;
  limit: string;
  lastUpdateId: number | string;
  tikersRest: string;
  API_WS: string;
  streamId: number;
  tikersWS: string;
  itemsStream: JSON[];
  itemsAsks: Array<DataItem>;
  itemsBids: Array<DataItem>;
  userAsks: string[];
  userBids: string[];
  connect: boolean;
  countAttempts: number;
  socket: null | WebSocket;
  runStream: boolean;
  errorMessage: number;
  haveResponseData: boolean;
}

export interface DataItem {
  price : string,
  quantity : string,
}

export interface DataResponseRest {
  asks: string[][];
  bids: string[][];
  lastUpdateId: number;
}

export interface DataResponseStream {
  a: string[][];
  b: string[][];
}
