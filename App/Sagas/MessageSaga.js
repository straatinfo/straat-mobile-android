import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import MessageActions from '../Redux/MessageRedux'
import { showAlertBox, logStore, AppData } from './../Redux/commonRedux'
import { put, call, select } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'

import { popUpAlert } from './../Lib/Helper/alertHelper'
import { onloginPopUp, getApprovedTeamList } from './../Transforms/Filters'
import language from '../Lib/CutomLanguage'
import { getUser } from '../Redux/UserRedux'
import { fixGiftChatMessages, fixConvo } from '../Transforms/messagesHelper'
// import Api from '../Services/Api';

// export function* fetchMessage(API, action) {
//     try {
//         console.log('Fetching messages...', action);
//         console.log('Fetching messages API', API);
//         const messageResponse = yield call(API.getMessage, action.conversationId);
//         if (messageResponse.ok && messageResponse.data.status === 1) {
//             console.log('Fetching message successful.', messageResponse);
//             let messages = messageResponse.data.data.map((message) => {
//                 return {
//                     _id: message._id,
//                     text: message.body,
//                     createdAt: message.createdAt,
//                     user: {
//                         _id: message._author._id,
//                         name: message._author.username
//                     }
//                 }
//             });
//             yield put(MessageActions.fetchMessageSuccess(messages));
//         }
//     } catch (error) {
//         console.log('Fetching message failed. ', error);
//         yield put(MessageActions.fetchMessageFailure(error));
//     }
// }

// export function* sendMessage(API, action) {
//     try {
//         console.log('Sending messages...', action);
//         console.log('Sending messages API', API);
//         const messageResponse = yield call(API.sendMessage, action.message);
//         if (messageResponse.ok && messageResponse.data.status === 1) {
//             console.log('Sending message successful.', messageResponse);
//             let newMessage = {
//                 _id: messageResponse.data.data._id,
//                 text: messageResponse.data.data.body,
//                 createdAt: messageResponse.data.data.createdAt,
//                 user: {
//                     _id: messageResponse.data.data._author
//                 }
//             }
//             console.log('New Message: ', newMessage);
//             yield put(MessageActions.sendMessageSuccess(newMessage));
//         }
//     } catch (error) {
//         console.log('Sending message failed. ', error);
//         yield put(MessageActions.sendMessageFailure(error));
//     }
// }

export const postConvo = function * (API, action) {
  yield put(MessageActions.chatMerge({fetchingConvo: true}))
  console.log('getting createConvo', action.params)
  const { type, param } = action.params
  const user = yield select(getUser)
  try {
    const fetching = yield call(API.postConversation, { user, type, param})

    console.log('getting conversation ID', fetching)
    if (fetching.ok && fetching.data.status === 1) {
      const { payload } = fetching.data
    //   let messages = messageResponse.data.data.map((message) => { 
    //     return {
    //       _id: message._id,
    //       text: message.body,
    //       createdAt: message.createdAt,
    //       user: {
    //         _id: message._author._id,
    //         name: message._author.username
    //       }
    //     }
    //   })
      const convos = fixConvo(payload, user._id)
      const convo = convos || []
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
    console.log('getMessagesByConvoId', fetching)
    if (fetching.ok && fetching.data.status === 1) {
        const { payload } = fetching.data
        console.log('getting conversation ID', fetching)
      //   let messages = messageResponse.data.data.map((message) => {
      //     return {
      //       _id: message._id,
      //       text: message.body,
      //       createdAt: message.createdAt,
      //       user: {
      //         _id: message._author._id,
      //         name: message._author.username
      //       }
      //     }
      //   })
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
    const fetching = yield call(API.postPullConversation, { user, type, target})
    if (fetching.ok && fetching.data.status === 1) {
      const { payload } = fetching.data
      console.log('getting conversation ID', fetching)
    //   let messages = messageResponse.data.data.map((message) => {
    //     return {
    //       _id: message._id,
    //       text: message.body,
    //       createdAt: message.createdAt,
    //       user: {
    //         _id: message._author._id,
    //         name: message._author.username
    //       }
    //     }
    //   })
    // fixConvo(payload, user._id)
      yield put(MessageActions.chatMerge({...fixConvo(payload, user._id), fetching: false}))
      // yield put(MessageActions.setCurrentUser(userWithToken))
    }
  } catch (error) {
    console.log('Fetching message failed. ', error)
    yield put(MessageActions.chatMerge({fetching: false}))
  }
}
