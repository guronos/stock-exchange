import { State } from './types';

export const getAPIData = async ({ commit, state, dispatch }: { commit: any; state: State; dispatch: any }, tiker: string): Promise<void> => {
  try {
    state.runStream = true;
    state.errorMessage = 0;
    await commit('saveTikersAndConnect', tiker);
    let requestRest = false;
    state.socket = new WebSocket(`${state.API_WS}${state.streamId}`);
    state.socket.onopen = () => {
      if (state.socket) {
        state.socket.send(
          JSON.stringify({
            method: 'SUBSCRIBE',
            params: [`${state.tikersWS}@${state.kindOfFlow}`],
            id: state.streamId,
          }),
        );
      }
    };

    state.socket.onmessage = async (e: MessageEvent) => {
      let message: JSON = JSON.parse(e.data);
      if (!state.lastUpdateId) {
        state.itemsStream.push(message);
        if (!requestRest) {
          runResponseRest();
        }
      } else {
        commit('saveDataFromStream', message);
      }
    };
    state.socket.onerror = () => {
      state.errorMessage = 3;
      commit('closeStream');
    };

    async function runResponseRest() {
      requestRest = true;
      fetch(`${state.API_URL_Rest}${state.kindOfFlow}?symbol=${state.tikersRest}&limit=${state.limitRest}`)
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          } else {
          }
        })
        .catch(() => {
          commit('closeStream');
          state.errorMessage = 2;
        })
        .then((responseJSON) => {
          commit('saveDataFromRest', responseJSON);
        })
        .catch(() => {});
    }

    setTimeout(reload, 8000);
    function reload() {
      if (state.runStream) {
        if (state.itemsStream.length < 1) {
          if (state.countAttempts > 2) {
            location.reload();
          } else {
            state.socket!.close();
            state.countAttempts += 1;
            dispatch('getAPIData', state.tikersRest);
          }
        }
      }
    }
  } catch (e) {
    commit('closeStream');
    state.errorMessage = 1;
  }
};
