import MessageActions from '../Redux/MessageRedux'
import { put, call, select } from 'redux-saga/effects'
import { getUser } from '../Redux/UserRedux'
import { fixGiftChatMessages, fixConvo } from '../Transforms/messagesHelper'

export const postConvo = function * (API, action) {
  yield put(MessageActions.chatMerge({fetchingConvo: true}))
  const { type, param } = action.params
  const user = yield select(getUser)
  try {
    const fetching = yield call(API.postConversation, { user, type, param })
    __DEV__ && console.log('fetching', fetching)
    if (fetching.ok && fetching.data.status === 1) {
      const { payload } = fetching.data
      // const convos = fixConvo(payload, user._id)
      // const convo = convos || []
      const convo = []
      yield put(MessageActions.chatMerge({...convo, fetchingConvo: false}))

      yield put(MessageActions.getMessagesByConvoId({target: payload._id, title: convo.title}))
    }
  } catch (error) {
    console.log('Fetching message failed. ', error)
    yield put(MessageActions.chatMerge({fetchingConvo: false}))
  }
}
 
export const getMessagesByConvoId = function * (API, action) {
  const { param: { target, title } } = action
  const user = yield select(getUser)
  yield put(MessageActions.chatMerge({fetching: true, messages: []}))
  try {
    const fetching = yield call(API.getMessagesByConvoId, { user, target, _reporter: user._id, keyword: 'all' })
    if (fetching.ok && fetching.data.status === 1) {
      const { payload } = fetching.data
      yield put(MessageActions.chatMerge({conversationId: target, title: title, messages: fixGiftChatMessages(payload).reverse(), fetching: false}))
    }
  } catch (error) {
    console.log('Fetching message failed. ', error)
    yield put(MessageActions.chatMerge({fetching: false}))
  }
}

export const getConversation = function * (API, action) {
  const { param: { type, target } } = action
  const user = yield select(getUser)
  try {
    const fetching = yield call(API.postPullConversation, { user, type, target })
    if (fetching.ok && fetching.data.status === 1) {
      const { payload } = fetching.data
      yield put(MessageActions.chatMerge({...fixConvo(payload, user._id), fetching: false}))
    }
  } catch (error) {
    console.log('Fetching message failed. ', error)
    yield put(MessageActions.chatMerge({fetching: false}))
  }
}
