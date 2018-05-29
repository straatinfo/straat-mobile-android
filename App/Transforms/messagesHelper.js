import { ConvoTypes } from '../Services/Constant'
import { hasImage, crop, getImageUrl } from './Cloudinary'

export const fixGiftChatMessages = (messages = []) => {
  return messages.map((message) => {
    let avatar = {}
    if (hasImage(message._author._profilePic)) {
      avatar = {avatar: crop(200, getImageUrl(message._author._profilePic))}
    }

    return {
      _id: message._id,
      text: message.body || '',
      createdAt: message.createdAt || '',
      user: {
        _id: message._author._id || '',
        name: message._author.username || '',
        ...avatar
      }
    }
  })
}

export const fixConvo = (conversation, _user) => {
  const {_id, type, title, participants, messages, _profilePic} = conversation
  if (!_id) {
    return false
  }

  const lastMesasge = messages[0] ? messages[0]._author.username + ': ' + messages[0].body : ''
  if (type === ConvoTypes.USER) {
    const otherUser = participants.find((participant) => {
      if (!participant._user) {
        return false
      }
      return participant._user._id !== _user
    })
    if (!otherUser) {
      return false
    }
    const title = otherUser._user ? otherUser._user.username || '' : ''
    return {
      _id: _id,
      type: type,
      title: title || '',
      lastMessage: lastMesasge,
      _profilePic: otherUser._user._profilePic
    }
  }
  return {
    _id: _id,
    type: type,
    title: title || '',
    lastMessage: lastMesasge,
    _profilePic: _profilePic
  }
}
// for test
export const fixConvoForTeam = (team, _user) => {
  const {_id, teamName, _profilePic} = team
  return {
    _id: _id,
    type: 'TEAM',
    title: teamName || '',
    lastMessage: '',
    _profilePic: _profilePic,
    hasNew: false
  }
}

export const validateConvo = (conversation, _user) => {

}

/**
 * @description fix fetched list
 * @param conversations, _user
 */

export const fixConversationListing = (conversations = [], _user) => {
  return conversations.map((conversation) => {
    return fixConvo(conversation, _user)
  }).filter((conversation) => !!conversation)
}

/**
 * @description fix fetched list, team listing while backend not fix old team convo ids
 * @param conversations, _user
 */

export const fixConversationListingForTeam = (teams = [], _user) => {
  console.log('teams', teams)
  return teams.map((team) => {
    return fixConvoForTeam(team, _user)
  }).filter((team) => !!team)
}
