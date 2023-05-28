import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { State } from './types'

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    API_URL_Rest: 'https://api.binance.com/api/v3/',
    kindOfFlow : 'depth',
    limitRest : '20',
    lastUpdateId : '',
    tikersRest : '',
    API_WS : 'wss://stream.binance.com:9443/ws/stream',
    streamId : 1,
    tikersWS : '',
    itemsStream : [],
    itemsAsks : [],
    itemsBids : [],
    userAsks : [],
    userBids : [],
    connect : false,
    countAttempts : 0,
    socket : null,
    runStream : false,
    errorMessage : 0,
    haveResponseData : false
  },
  getters: {
    showOrdersAsks(state: State){
        return state.itemsAsks
    }, 
    showOrdersBids(state: State){
        return state.itemsBids
    },
    showTikers(state: State){
      return state.tikersRest
  },
  showUserOrdersAsks(state: State){
    return state.userAsks
}, 
  showUserOrdersBids(state: State){
    return state.userBids
},
  },
  actions: {
    async getAPIData({commit, state}, tiker: string) {
          try {  
            state.runStream = true
      state.errorMessage = 0
      await commit('saveTikersAndConnect', tiker)
      let requestRest = false

      state.socket = new WebSocket(`${state.API_WS}${state.streamId}`)
      state.socket.onopen = ()=> {
        state.socket.send(
                JSON.stringify({
                    "method": "SUBSCRIBE",
                    "params":
                    [`${state.tikersWS}@${state.kindOfFlow}`],
                    "id": state.streamId
                    })
            )
        }



        state.socket.onmessage = async (e)=>{
            let message = JSON.parse(e.data)
            console.log('this', e)
            if (!state.lastUpdateId) {
              state.itemsStream.push(message)
              if (!requestRest) {
              runResponseRest()
              } 
            } else {
              commit('saveDataFromStream', message)
            }
          }      

          async function runResponseRest(){
            requestRest = true
        fetch(`${state.API_URL_Rest}${state.kindOfFlow}?symbol=${state.tikersRest}&limit=${state.limitRest}`)
        .then(response=>{
          console.log(response)
          if (response.status == 200) {
            return response.json()
        } else {
        }
        })
        .catch(e=>{
          console.log('Ошибка', e)
          store.commit('closeStream')
          state.errorMessage = 2
        })
        .then(responseJSON=>{
          commit('saveDataFromRest', responseJSON)
        })
        .catch(e=>{console.log(e)})
          
      }
        

          setTimeout(reload, 8000)
          function reload(){
            if (state.runStream) {
            if (state.itemsStream.length < 1){
              if (state.countAttempts > 2){
                location.reload()
              } else {
              console.log('ok', state.socket)
              state.socket.close()
              state.countAttempts += 1
              store.dispatch('getAPIData', state.tikersRest)
              }
            }
          }
          }
        } catch (e) {
          console.log(state.socket)
          store.commit('closeStream')
          state.errorMessage = 1
        }
    },
    
  },
  
  mutations: {
    saveTikersAndConnect(state: State, tikers: string){
      state.tikersRest = tikers.toUpperCase()
      state.tikersWS = tikers.toLowerCase()
      state.connect = true
    },
    saveDataFromRest(state: State, dataFromRest){
        state.lastUpdateId = dataFromRest.lastUpdateId
        state.haveResponseData = true
        state.itemsAsks = dataFromRest.asks
        state.itemsBids = dataFromRest.bids
        state.userAsks.push(dataFromRest.asks[2][0])
        state.userAsks.push(dataFromRest.asks[3][0])
        state.userBids.push(dataFromRest.bids[3][0])
        state.userBids.push(dataFromRest.bids[4][0])
console.log(state.itemsBids)
    },
    saveDataFromStream(state: State, dataFromStream){
        function deleteDubles(dataPricesForStrem, currentItemsPrices, sort){
          const resaultItems: string[][] = []
          
         dataPricesForStrem?.forEach((element: string[]) => {
            let elementFound = false
            if (Number(element[1]) === 0) {
              currentItemsPrices.forEach((currentElement, currentIndx) => {
               if (element[0] == currentElement[0]) {
                currentItemsPrices.splice(currentIndx, 1)
               }
              })
            } else {
              currentItemsPrices.forEach((currentElement, currentIndx) => {
              if (element[0] == currentElement[0]) {
                currentItemsPrices.splice(currentIndx, 1, element)
                elementFound = true
              }
            });
            if (!elementFound){
              resaultItems.push(element)
          }
        }
        });
        currentItemsPrices.forEach((i: number)=>{resaultItems.push([i[0], i[1]])})
        if (sort === 'down') {
          const sortItem = resaultItems.sort((a, b)=>Number(a[0])-Number(b[0]))
          state.itemsAsks = sortItem.splice(0, 20)
        } else {
          const sortItem = resaultItems.sort((a, b)=>Number(b[0])-Number(a[0]))
          state.itemsBids = sortItem.splice(0, 20)
        }
      }
      deleteDubles(dataFromStream.a, state.itemsAsks, 'down')
      deleteDubles(dataFromStream.b, state.itemsBids, 'up')
      }, 
      closeStream(state: State){
       if (state.socket) {
        state.runStream = false
        state.itemsStream = []
        state.itemsAsks = []
        state.itemsBids = []
        state.userAsks = []
        state.userBids = []
        state.connect = false
        state.countAttempts = 0
        state.lastUpdateId = ''
        state.tikersRest = ''
        state.haveResponseData = false
       } else {
        state.runStream = false
        state.connect = false
        state.countAttempts = 0
        state.tikersRest = ''
        state.haveResponseData = false
       }
      },
     
    },
  },
)

export function useStore () {
  return baseUseStore(key)
}

