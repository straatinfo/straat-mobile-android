import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon, Button, Container, Content, Header, Title, Left, Body, Right } from 'native-base'

import {drawerData} from './../../Navigation/NavigationDrawer'
import { Image, BackHandler, Dimensions, Keyboard, LayoutAnimation } from 'react-native'

import { Image, BackHandler, Dimensions, Keyboard, LayoutAnimation } from 'react-native'
import {
  Card,
  CardItem,
  Text,
  View,
  Thumbnail,
  Container,
  Header,
  Content,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Spinner
} from 'native-base'


import { Container, Form, Content, Button, Item, Input, Icon, Text, Header, Body, Title, Left, Right } from 'native-base'

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native'
import { Text, Container, Header, Content, Title, Button, Right, Body, Icon, Left, FlatList, List, ListItem, Thumbnail, H1, H2, H4, Card, CardItem } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Triangle from 'react-native-triangle'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import Styles from './Styles'
import Lang from '../../Lib/CutomLanguage'
import Api from '../../Lib/Common/Api'
import TeamActions from '../../Redux/TeamRedux'
import RequestActions from '../../Redux/UserRequestRedux'
import { getTeamRequest } from '../../Sagas/TeamSagas'
import { crop } from '../../Transforms/Cloudinary'
import { getTeamLogo, checkLeaderById, isActiveTeam } from '../../Transforms/TeamHelper'
import CircleLoader from '../../Components/CircleLoader'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import colors, { Images, Colors } from '../../Themes'
import Spacer from '../../Components/Spacer'
import { GetFullName } from '../../Transforms/NameUtils'
import ButtonIcon from './../../Components/ButtonIcon'
import MainButton from '../../Components/MainButton'
import Conversation from '.././Conversation'
import { CONNECTION } from '../../Services/AppSocket'
import ConversationActions from '../../Redux/ConversationRedux'
import SocketActions from '../../Redux/SocketRedux'
import { SocketTypes, ConvoTypes, convoOption } from '../../Services/Constant'

import { Image, BackHandler, Dimensions, Keyboard, LayoutAnimation } from 'react-native'
import {
  Card,
  CardItem,
  Text,
  View,
  Thumbnail,
  Container,
  Header,
  Content,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Spinner,
  Badge
} from 'native-base'
import MapView from 'react-native-maps'
import ReportMapContainer from './../../Containers/ReportMap/ReportMapContainer'
import UnderMigration from './../../Components/UnderMigration'
import {drawerData} from './../../Navigation/NavigationDrawer'
import ReportsActions from './../../Redux/ReportsRedux'

import NotificationActions from './../../Redux/NotificationRedux'

import UsersActions from './../../Redux/UserRedux'
// import Images from './../Themes/Images'
import { Images, Metrics } from './../../Themes'
/**  actionsyles */
import { formatDate } from './../../Transforms/DateTransformer'
import { onloginPopUp, getApprovedTeamList } from './../../Transforms/Filters'
import CenterView from '../../Components/CenterView'
import language from '../../Lib/CutomLanguage'
import style from './../Styles/MyReportStyle'
import GlobalStyle from '../../Components/Styles/GlobalStyle'
import CircleLoader from '../../Components/CircleLoader'

// import ChatScreen from './../ChatScreen'
import Conversation from '../Conversation'
import ReportListTypeA from '../../Components/MyReport/ReportListTypeA'
import ReportListTypeB from '../../Components/MyReport/ReportListTypeB'
import ReportListTypeC from '../../Components/MyReport/ReportListTypeC'
import TestWebSocket from '../../Components/TestWebSocket';

import { renderIf, CenterView, CircleButton, RowView, Spacer, SlidingUpPanel, Triangle, ValidationComponent } from './../../Components'


import AlertMessage from './../Components/AlertMessage'
import BusyIndicator from 'react-native-busy-indicator'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import HeaderBigCenterLogo from './../Components/HeaderBigCenterLogo'
import HeaderTextField from './../Components/HeaderTextField'
import RegisterUserData from './../Components/RegisterUserData'
import UnderMigration from './../Components/UnderMigration'