import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import MessageActions from '../Redux/MessageRedux'
import { showAlertBox, logStore, AppData } from './../Redux/commonRedux'
import { put, call } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'

import { popUpAlert } from './../Lib/Helper/alertHelper'
import { onloginPopUp, getApprovedTeamList } from './../Transforms/Filters'
import language from '../Lib/CutomLanguage'
import Api from '../Services/Api';

export function* fetchMessage(API, action) {
    try {
        console.log('Fetching messages...', action);
        console.log('Fetching messages API', API);
        const messageResponse = yield call(API.getMessage, action.conversationId);
        if (messageResponse.ok && messageResponse.data.status === 1) {
            console.log('Fetching message successful.', messageResponse);
            let messages = messageResponse.data.data.map((message) => {
                return {
                    _id: message._id,
                    text: message.body,
                    createdAt: message.createdAt,
                    user: {
                        _id: message._author._id,
                        name: message._author.username
                    }
                }
            });
            yield put(MessageActions.fetchMessageSuccess(messages));
        }
    } catch (error) {
        console.log('Fetching message failed. ', error);
        yield put(MessageActions.fetchMessageFailure(error));
    }
}

export function* sendMessage(API, action) {
    try {
        console.log('Sending messages...', action);
        console.log('Sending messages API', API);
        const messageResponse = yield call(API.sendMessage, action.message);
        if (messageResponse.ok && messageResponse.data.status === 1) {
            console.log('Sending message successful.', messageResponse);
            let newMessage = {
                _id: messageResponse.data.data._id,
                text: messageResponse.data.data.body,
                createdAt: messageResponse.data.data.createdAt,
                user: {
                    _id: messageResponse.data.data._author
                }
            }
            console.log('New Message: ', newMessage);
            yield put(MessageActions.sendMessageSuccess(newMessage));
        }
    } catch (error) {
        console.log('Sending message failed. ', error);
        yield put(MessageActions.sendMessageFailure(error));
    }
}