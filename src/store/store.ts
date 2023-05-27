import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'


export interface State {
    API_URL: string,
    API_WS: string,
    getAPIData: Function,
}
// export interface Actions {
//     getAPIData: Function
// }

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    API_URL_Rest: 'https://api.binance.com/api/v3/',
    kindOfFlowRest : 'depth',
    limitRest : '20',
    lastUpdateId : '',
    tikersRest : 'BNBBTC',
    API_WS : 'wss://stream.binance.com:9443/ws/stream',
    streamId : 1,
    streamParams : [
        "bnbbtc@depth"
        ],
        itemsStream : [],
    itemsAsks : [],
    itemsBids : [],
    userAsks : [],
    userBids : []

  },
  getters: {
    showOrdersAsks(state){
        return state.itemsAsks
    }, 
    showOrdersBids(state){
        return state.itemsBids
    },
    showTikers(state){
      return state.tikersRest
  },
  showUserOrdersAsks(state){
    return state.userAsks
}, 
  showUserOrdersBids(state){
    return state.userBids
},
  },
  actions: {
    async getAPIData({commit, state}) {
      let requestRest = false
        let socket = new WebSocket(`${state.API_WS}${state.streamId}`)
        socket.onopen = ()=> {
            socket.send(
                JSON.stringify({
                    "method": "SUBSCRIBE",
                    "params":
                    [`${state.streamParams}`],
                    "id": state.streamId
                    })
            )
        }

        socket.onmessage = async (e)=>{
            let message = JSON.parse(e.data)
            if (!state.lastUpdateId) {
              state.itemsStream.push(message)
              if (!requestRest) {
              runResponseRest()
              } 
            } else {
              commit('saveDataFromStream', message)
            }
            
            // console.log(message)
          }
          async function runResponseRest(){
            requestRest = true
        const restData = await fetch(`${state.API_URL_Rest}${state.kindOfFlowRest}?symbol=${state.tikersRest}&limit=${state.limitRest}`)
        const data = await restData.json()
        commit('saveDataFromRest', data)
          }
        
        
    // console.log('hi', data)
    // console.log('item')
    
    // setTimeout(()=>{console.log('this item', item)
    //     socket.close()
    //     }, 10000)
    
    },
  },
  mutations: {

    saveDataFromRest(state, dataFromRest){
        // console.log('mutate', dataFromRest)
        state.lastUpdateId = dataFromRest.lastUpdateId
        state.itemsAsks = dataFromRest.asks
        state.itemsBids = dataFromRest.bids
        // state.itemsStream.forEach((element, index)=>{
        //   console.log(state.itemsStream.length)
        //   if (element.u <= dataFromRest.lastUpdateId) {
        //     state.itemsStream.splice(index, 1)
        //     console.log('+')
        //   } else {
        //     console.log('-', dataFromRest.lastUpdateId, element.u)
        //   }
        // })
        // state.itemsAsks = dataFromRest.asks
        // state.itemsBids = dataFromRest.bids
        state.userAsks = dataFromRest.asks[2][0]
        state.userBids = dataFromRest.bids[3][0]
        // console.log('mutate2', state.itemsAsks, state.itemsBids)

    },
    saveDataFromStream(state, dataFromStream){
        function deleteDubles(dataPricesForStrem, currentItemsPrices, sort){
          // console.log('currentItemsPrices', currentItemsPrices)
          const resaultItems = []

          // const unique = []
          
         dataPricesForStrem?.forEach((element) => {
            let elementFound = false
            // console.log('ok')
            if (Number(element[1]) === 0) {
              currentItemsPrices.forEach((currentElement, currentIndx) => {
               if (element[0] == currentElement[0]) {
                currentItemsPrices.splice(currentIndx, 1)
               }
              })
            } else {
              currentItemsPrices.forEach((currentElement, currentIndx) => {
              if (element[0] == currentElement[0]) {
                
                // console.log('do CI', currentItemsPrices[currentIndx])
                currentItemsPrices.splice(currentIndx, 1, element)
                // console.log('past CI', currentItemsPrices[currentIndx])
                elementFound = true
              }
            });
            if (!elementFound){
              resaultItems.push(element)
          }
        }
        });
        currentItemsPrices.forEach(i=>{resaultItems.push([i[0], i[1]])})
        // console.log('currentItemsPrices', currentItemsPrices)
        // console.log('resaultItems', resaultItems)
        if (sort === 'down') {
          const sortItem = resaultItems.sort((a, b)=>a[0]-b[0])
          state.itemsAsks = sortItem.splice(0, 21)
          // console.log('state.itemsAsks', sortItem)
        } else {
          const sortItem = resaultItems.sort((a, b)=>b[0]-a[0])
          state.itemsBids = sortItem.splice(0, 21)
          // console.log('state.itemsBids', sortItem)
        }
      }
      deleteDubles(dataFromStream.a, state.itemsAsks, 'down')
      deleteDubles(dataFromStream.b, state.itemsBids, 'up')
      } 
      
     
    },
  },
)

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}

