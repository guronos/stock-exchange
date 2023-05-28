
export interface State {
    API_URL_Rest: string,
    kindOfFlow : string,
    limitRest : string,
    lastUpdateId : string,
    tikersRest : string,
    API_WS : string,
    streamId : number,
    tikersWS : string,
    itemsStream : [],
    itemsAsks : string[][] | [],
    itemsBids : string[][] | [],
    userAsks : string[] | [],
    userBids : string[] | [],
    connect : boolean,
    countAttempts : number,
    socket : null | WebSocket,
    runStream : boolean,
    errorMessage : number,
    haveResponseData : boolean
  }