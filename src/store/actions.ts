import { State, DataResponseRest } from './types';

export const getAPIData = async ({ commit, state, dispatch }: { commit: any; state: State; dispatch: any }, tikersData: string[]): Promise<void> => {
  try {
    state.runStream = true;
    state.errorMessage = 0;
    await commit('saveTikersAndConnect', tikersData);
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

    state.socket.onmessage = async (e: MessageEvent): Promise<void> => {
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

    async function runResponseRest(): Promise<void> {
      requestRest = true;
      fetch(`${state.API_URL_Rest}${state.kindOfFlow}?symbol=${state.tikersRest}&limit=${state.limit}`)
        .then((response): Promise<DataResponseRest>=> response.json())
        .catch((): void => {
          commit('closeStream');
          state.errorMessage = 2;
        })
        .then((responseJSON): void => {
          commit('saveDataFromRest', responseJSON);
        })
        .catch((): void => {});
    }

    setTimeout(reload, 8000);
    function reload(): void {
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
