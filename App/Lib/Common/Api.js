import configuration from './../../Config/AppConfig'
import Jlog from './../Helper/Jlog'
import { Urls } from './../Helper/Urls'

const serverUrl = configuration.ApiUrl

const Api = {
  login: function (usernameVal, passwordVal) {
    return new Promise(function (resolve, reject) {
      Jlog('login in: ' + serverUrl + 'v1/api/login')

      fetch(serverUrl + 'v1/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usernameVal,
          password: passwordVal
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson') ``
          Jlog('response object:', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  register: function (language, gender, first_name, last_name, username, password, street_name, house_num, postal_code, city, email_address, mobile_num, is_volunteer, register_option, lat, lng, is_reporter, host_id) {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: language,
          gender: gender,
          first_name: first_name,
          last_name: last_name,
          username: username,
          password: password,
          street_name: street_name,
          house_num: house_num,
          postal_code: postal_code,
          city: city,
          email_address: email_address,
          mobile_num: mobile_num,
          is_volunteer: is_volunteer,
          register_option: register_option,
          lat: lat,
          lng: lng,
          is_reporter: is_reporter,
          host_id: host_id
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getTeamDetails: function (team_id, access_token) {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/team/' + team_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + access_token,
        }
      })
        .then((response) => {
          return response.json()
          console.log(response)
        })
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getReports: function (user_id, host_id, is_active, report_id, status, report_type, offset, access_token, lat, lng, maxDist) {
    Jlog(serverUrl + 'v1/api/report/?user_id=' +
      user_id + '&host_id=' + host_id + '&is_active=' + is_active + '&report_id=' + report_id + '&status=' + status + '&report_type=' +
      report_type + '&offset=' + offset + '&max_dist=' + maxDist + '&lat=' + lat + '&lng=' + lng)
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/report/?user_id=' +
        user_id + '&host_id=' + host_id + '&is_active=' + is_active + '&report_id=' + report_id + '&status=' + status + '&report_type=' +
        report_type + '&offset=' + offset + '&max_dist=' + maxDist + '&lat=' + lat + '&lng=' + lng, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          }
        })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((responseData) => {
          // Jlog("inside responsejson");
          // Jlog('response object:',responseData);
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getReportsByCoordinate: (reportParams, access_token) => {
    return new Promise((resolve, reject) => {
      const urlString = Urls.convertObjtoParamString(serverUrl + 'v1/api/report/', reportParams)
      console.log(urlString)

      fetch(urlString, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Jlog("inside responsejson");
          // Jlog('response object:',responseData);
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    }) // end of promise
  },

  getCoordinateAddress: function (lat, long) {
    return new Promise(function (resolve, reject) {

      fetch(Urls.getGoogleMapApis(long, lat), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 
  getAddressByCoordinates: (longitude, latitude) => {
    return new Promise((resolve, reject) => {
      fetch(Urls.getGoogleMapApis(longitude, latitude), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getHostIdByCoordinate: function (lat, long, radius) {
    return new Promise(function (resolve, reject) {
      fetch(Urls.getUrlHostId(lat, long, radius), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => { console.log('getHostIdByCoordinate response', response); return response.json() })
        .then((responseData) => {
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  submitReport: function (reportData, access_token) {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/report/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + access_token
        },
        body: reportData
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData)
          Jlog('after resolve')
        })
        .catch((error) => {
          Jlog(error)
          reject(error)
          Jlog('rejected')
        })
    })
  },

  getCategories: function (host_id, access_token) {
    return new Promise(function (resolve, reject) {
      // alert('https://straatinfo-backend.herokuapp.com/v1/api/category?host_id='+host_id);
      fetch(serverUrl + 'v1/api/category?host_id=' + host_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  createNewTeam: function (user_id, access_token) {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/team/' + user_id, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        body: data
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getHostProfile: function (host_id, access_token) {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/host/profile?host_id=' + host_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * @param object ( {data: {status, report_id}}, accessToken)
   *
   */
  changeStatus: (data, accessToken) => {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/report/status/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  updateTeam: function (team_name, team_logo, team_email, access_token) {
    return new Promise(function (resolve, reject) {
      const data = new FormData()
      data.append('team_name', team_name)
      data.append('team_email', team_email)
      data.append('team_logo', team_logo, {
        uri: team_logo.uri,
        type: 'image/jpeg',
        name: 'img'
      })
      fetch(serverUrl + 'v1/api/team/' + team_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        },
        body: data
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object:', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getTeamList: (access_token) => {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + 'v1/api/team', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + access_token
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('response object', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  acceptNewRequest: (access_token, team_id, user_id) => {
    return new Promise(function (resolve, reject) {
      fetch(serverUrl + '', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + access_token
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          Jlog('inside responsejson')
          Jlog('response object', responseData)
          resolve(responseData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },


}
export default Api
