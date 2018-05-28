export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  getReportsByReporter: (param) => {
    const report1 = '{"_id":"5b0813c504bd5e00145659b5","updatedAt":"2018-05-25T13:46:45.315Z","createdAt":"2018-05-25T13:46:45.278Z","_reporter":{"_id":"5a8b4afbac58ad00141a352e","username":"test","email":"test@test.com"},"_host":{"_id":"5a7b485a039e2860cf9dd19a","hostName":"Gemeente Den Haag","email":"denhaag@straat.info"},"_reportType":{"_id":"5a7888bb04866e4742f74955","code":"A","name":"Public Space"},"title":"Public Space","description":"gg","_mainCategory":{"_id":"5af312af47a66f001485c16c","name":"spec desg dut 2018 05 09 ispec desg dut 2018 05 09 i","description":""},"_subCategory":{"_id":"5af3133c47a66f001485c17e","name":"spec sub eng 2018 05 09 ia","description":null},"_team":{"_id":"5a8b4afbac58ad00141a352f","teamName":"teamTest"},"location":"2129 Chino Roces Ave, Legazpi Village, Makati, 1229 Metro Manila, Philippines","long":121.0134943,"lat":14.5578609,"generatedReportId":"A20180525_00002","__v":0,"_conversation":{"_id":"5b0813c504bd5e00145659b6","messages":[],"participants":[],"type":"TEAM","title":"Untilted conversation"},"attachments":[],"reportCoordinate":{"coordinates":[121.0134943,14.5578609],"type":"Point"},"peopleInvolvedDescription":"","peopleInvolvedCount":0,"isPeopleInvolved":false,"vehicleInvolvedDescription":"","vehicleInvolvedCount":0,"isVehicleInvolved":false,"isPublic":false,"isUrgent":true,"status":"NEW"}'
    const report2 = '{"_id":"5b0813c504bd5e00145659b4","updatedAt":"2018-05-25T13:46:45.315Z","createdAt":"2018-05-25T13:46:45.278Z","_reporter":{"_id":"5a8b4afbac58ad00141a352e","username":"test","email":"test@test.com"},"_host":{"_id":"5a7b485a039e2860cf9dd19a","hostName":"Gemeente Den Haag","email":"denhaag@straat.info"},"_reportType":{"_id":"5a7888bb04866e4742f74955","code":"A","name":"Public Space"},"title":"Public Space","description":"gg","_mainCategory":{"_id":"5af312af47a66f001485c16c","name":"spec desg dut 2018 05 09 i","description":""},"_subCategory":{"_id":"5af3133c47a66f001485c17e","name":"spec sub eng 2018 05 09 ia","description":null},"_team":{"_id":"5a8b4afbac58ad00141a352f","teamName":"teamTest"},"location":"2129 Chino Roces Ave, Legazpi Village, Makati, 1229 Metro Manila, Philippines","long":121.0134943,"lat":14.5578609,"generatedReportId":"A20180525_00002","__v":0,"_conversation":{"_id":"5b0813c504bd5e00145659b6","messages":[],"participants":[],"type":"TEAM","title":"Untilted conversation"},"attachments":[],"reportCoordinate":{"coordinates":[121.0134943,14.5578609],"type":"Point"},"peopleInvolvedDescription":"","peopleInvolvedCount":0,"isPeopleInvolved":false,"vehicleInvolvedDescription":"","vehicleInvolvedCount":0,"isVehicleInvolved":false,"isPublic":false,"isUrgent":true,"status":"NEW"}'
    const report3 = '{"_id":"5b0813c504bd5e00145659b3","updatedAt":"2018-05-25T13:46:45.315Z","createdAt":"2018-05-25T13:46:45.278Z","_reporter":{"_id":"5a8b4afbac58ad00141a352e","username":"test","email":"test@test.com"},"_host":{"_id":"5a7b485a039e2860cf9dd19a","hostName":"Gemeente Den Haag","email":"denhaag@straat.info"},"_reportType":{"_id":"5a7888bb04866e4742f74955","code":"A","name":"Public Space"},"title":"Public Space","description":"gg","_mainCategory":{"_id":"5af312af47a66f001485c16c","name":"spec desg dut 2018 05 09 i","description":""},"_subCategory":{"_id":"5af3133c47a66f001485c17e","name":"spec sub eng 2018 05 09 ia","description":null},"_team":{"_id":"5a8b4afbac58ad00141a352f","teamName":"teamTest"},"location":"2129 Chino Roces Ave, Legazpi Village, Makati, 1229 Metro Manila, Philippines","long":121.0134943,"lat":14.5578609,"generatedReportId":"A20180525_00002","__v":0,"_conversation":{"_id":"5b0813c504bd5e00145659b6","messages":[],"participants":[],"type":"TEAM","title":"Untilted conversation"},"attachments":[],"reportCoordinate":{"coordinates":[121.0134943,14.5578609],"type":"Point"},"peopleInvolvedDescription":"","peopleInvolvedCount":0,"isPeopleInvolved":false,"vehicleInvolvedDescription":"","vehicleInvolvedCount":0,"isVehicleInvolved":false,"isPublic":false,"isUrgent":true,"status":"NEW"}'

    return {
      ok: true,
      data: {
        status: 1,
        data: [
          JSON.parse(report1),

          JSON.parse(report2),

          JSON.parse(report3)
        ]
      }
    }
  },
  deleteReport: (username) => {
    return {
      ok: true,
      data: {data: {}, status: 1}
    }
  },
}
