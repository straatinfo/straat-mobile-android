import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import ConversationActions from '../Redux/ConversationRedux'
import { showAlertBox, logStore, AppData } from './../Redux/commonRedux'
import { put, call } from 'redux-saga/effects'  
import { changeto } from '../Redux/ScreenRedux'

import { popUpAlert } from './../Lib/Helper/alertHelper'
import { onloginPopUp, getApprovedTeamList } from './../Transforms/Filters'
import language from '../Lib/CutomLanguage'

export function* fetchConversation(API, action) {
  try {
    console.log('Fetching conversations...', action);
    console.log('Fetching conversations API', API);
    const conversationResponse = yield call(API.getConversation);
    if (conversationResponse.ok && conversationResponse.data.status === 1) {
      console.log('Fetching conversation successful.', conversationResponse);
      let conversation = conversationResponse.data.data.filter((teamConversation) => {
        return teamConversation._id === action.conversationId
      }); 
      yield put(ConversationActions.fetchConversationSuccess(conversation[0]));
    }
  } catch (error) {
    console.log('Fetching conversation failed. ', error);
    yield put(ConversationActions.fetchConversationFailure(error));
  }
}

export function* createConversation(API, action) {
  try {
    console.log('Creating conversation...', action);
    console.log('Creating conversation API', API);
    const conversationResponse = yield call(API.postConversation, action.newConversation);
    if (conversationResponse.ok && conversationResponse.data.status === 1) {
      console.log('Creating conversation successful.', conversationResponse);
      yield put(ConversationActions.setSelectedConversationId(conversationResponse.data.data._id));
    }
  } catch (error) {
    console.log('Creating conversation failed. ', error);
  }
}