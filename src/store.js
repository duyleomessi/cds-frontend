/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { createStore } from 'redux';
import update from 'react-addons-update';

// Centralized application state
// For more information visit http://redux.js.org/
const initialState = {
  main: {
    currentScreen: 'INTRO',
    teams: [],
    currentRoundInfo: {
      greenName: '',
      greenResults: ['START:START'],
      redName: '',
      redResults: ['START:START'],
    },
    currentRoundTimeLeft: 0,
    redTimeLeftInMillis: 0,
    greenTimeLeftInMillis: 0,
    leaderboard: [],
  },
  admin: {
    teams: [],
    rounds: [],
    finalRounds: [],
    semiFinalRounds: [],
    selectedRound: '',
    selectedFinalRound: '',
    selectedSemiFinalRound: '',
  },
};

const store = createStore((state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'CHANGE_SCREEN':
      return update(state, { main: { currentScreen: { $set: action.data } } });
    case 'UPDATE_TEAM_LIST':
      return update(state, { main: { teams: { $set: action.data } } });
    case 'ADMIN_UPDATE_ROUND_LIST':
      return update(state, { admin: { rounds: { $set: action.data } } });
    case 'ADMIN_CHANGE_SELECTED_ROUND':
      return update(state, { admin: { selectedRound: { $set: action.data } } });
    case 'INIT_DATA':
      newState = update(state, {
        main: { $merge: action.data },
        admin: { $merge: action.data },
      });
      newState = update(newState, {
        admin: { selectedRound: { $set: action.data.currentRoundInfo._id } },
      });
      return newState;
    case 'CHANGE_ROUND':
      return update(state, {
        main: { currentRoundInfo: { $set: action.data } },
      });

    //  Timer
    case 'UPDATE_TIMER':
      return update(state, {
        main: { currentRoundTimeLeft: { $set: action.data } },
      });
    case 'UPDATE_RED_TIME_LEFT':
      return update(state, {
        main: { redTimeLeftInMillis: { $set: action.data } },
      });

    case 'UPDATE_GREEN_TIME_LEFT':
      return update(state, {
        main: { greenTimeLeftInMillis: { $set: action.data } },
      });
    
    case 'UPDATE_LEADERBOARD':
      return update(state, {
        main: { leaderboard: { $set: action.data } },
      });

    //  Semi Final Round
    case 'ADMIN_UPDATE_SEMI_FINAL_ROUND_LIST': 
      return update(state, { admin: { semiFinalRounds: { $set: action.data } } });

    case 'CHANGE_SEMI_FINAL_ROUND': 
      return update(state, {
        main: { currentRoundInfo: { $set: action.data } },
      });

    case 'ADMIN_CHANGE_SELECTED_SEMI_FINAL_ROUND':
      return update(state, { admin: { selectedSemiFinalRound: { $set: action.data } } });
    
    // Final Round
    case 'ADMIN_CHANGE_SELECTED_FINAL_ROUND':
      return update(state, { admin: { selectedFinalRound: { $set: action.data } } });
    
    case 'ADMIN_UPDATE_FINAL_ROUND_LIST':
      return update(state, { admin: { finalRounds: { $set: action.data } } });
      
    default:
      return state;
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
