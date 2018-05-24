import ConversationActions from '../Redux/ConversationRedux'
import { put, call, select } from 'redux-saga/effects'
import { getUser } from '../Redux/UserRedux'
import { fixConversationListingForTeam, fixConversationListing } from '../Transforms/messagesHelper'

export const fetchConversation = function * (API, action) {
  try {
    const conversationResponse = yield call(API.getConversation)
    if (conversationResponse.ok && conversationResponse.data.status === 1) {
      let conversation = conversationResponse.data.data.filter((teamConversation) => {
        return teamConversation._id === action.conversationId
      })
      yield put(ConversationActions.fetchConversationSuccess(conversation[0]))
    }
  } catch (error) {
    yield put(ConversationActions.fetchConversationFailure(error))
  }
}

export const createConversation = function * (API, action) {
  try {
    const conversationResponse = yield call(API.postConversation, action.newConversation)
    if (conversationResponse.ok && conversationResponse.data.status === 1) {
      yield put(ConversationActions.setSelectedConversationId(conversationResponse.data.data._id))
    }
  } catch (error) {
    console.log('Creating conversation failed. ', error)
  }
}

export const getConversationList = function * (API, action) {
  const user = yield select(getUser)
  try {
    yield put(ConversationActions.convoMerge({fetching: false}))
    const conversationResponse = yield call(API.getConversationList, { user })
    __DEV__ && console.log(conversationResponse)
    if (conversationResponse.ok && conversationResponse.data.status === 1) {
      yield put(ConversationActions.convoMerge({
        conversationList: fixConversationListing(conversationResponse.data.payload, user._id)
      }))
    }
  } catch (error) {
    yield put(ConversationActions.fetchConversationFailure(error))
  }

  yield put(ConversationActions.convoMerge({fetching: false}))

}

// use when chat general for team only
// export const getConversationList = function * (API, action) {
//   const user = yield select(getUser)
//   try {
//     const conversationResponse = yield call(API.getUserTeamList, { user })
//     if (conversationResponse.ok && conversationResponse.data.status === 1) {
//       yield put(ConversationActions.convoMerge({
//         conversationList: fixConversationListingForTeam(conversationResponse.data.data, user._id)
//       }))
//     }
//   } catch (error) {
//     yield put(ConversationActions.fetchConversationFailure(error))
//   }
// }
 