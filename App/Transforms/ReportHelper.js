import { ReportStatus, ReportTypes } from '../Services/Constant'
import { Colors } from '../Themes'
import { isExpired, isAfterADayDone } from '../Lib/Helper/TimeUtils'
import DebugConfig from '../Config/DebugConfig'
/**
 *
 * @description use to filter data from parse in backend used by getreportNearBty
 * @param param:{reports, teamList}
 *
 */
export const filterReportsByMapView = (reports = [], teamList = []) => {
  return reports.filter((report) => {
    return isDisplayPin(report, teamList)
  })
}

/**
 *
 * @description use to filter data from parse in backend used by notification
 * @param param:{reports, type.code`}
 *
 */
export const filterReportsByType = (reports = [], reportTypeCode = '') => {
  return reports.filter((report) => {
    return report._reportType.code === reportTypeCode
  })
}

/**
 *
 * @description as of now backend dont give right order of report so i will correct here, must change this asap
 * @param param:{reports, type.code`}
 *
 */
export const orderBy = (reports = []) => {
  return reports.reverse()
}

/**
 *
 * @description flat reports
 * @param reports
 *
 */
export const flatReports = (reports) => {
  return reports.map(flatReport)
}

/**
 *
 * @description flat reports
 * @param reports
 *
 */
export const flatReport = (report, index) => {
  if (report.status === ReportStatus.new && isExpired(report.createdAt)) {
    console.log('expired: ', report)
    report.status = ReportStatus.expired
  }

  return report
}

/**
 *
 * @description use in displaying pin in map view, cause TYPE A B will only display on team members if its isPrivate,
 *               after chaging status to done, will become visible to public map,
 * @param param:{ Report: report, Team[]: teamList }
 *
 */
export const isDisplayPin = (report, teamList) => {
  __DEV__ && console.log('report', report)
  // return false if expired

  if (report.status === ReportStatus.new && isExpired(report.createdAt, 9.504e+8)) {
    // 9.504e+8 - 11 days
    return DebugConfig.displayEpiredReportsInMap
  }

  if (report.status === ReportStatus.done && isAfterADayDone(report.createdAt)) {
    // dont display after 1 day done
    return false
  }

  if (report._reportType.code === 'A' || report._reportType.code === 'B') {
    // check if it has coordinates
    if (!report.reportCoordinate) {
      return false
    }

    if (report.isPublic !== undefined && report.isPublic === true) {
      // display on the map if its public
      return true
    } else
    if (report.isPublic !== undefined && report.isPublic === false) {
      // this mean it is public report: only member can see this
      // find report team if user has access
      const reportTeamID = report._team ? report._team._id : report._team
      return teamList.filter((team) => team._id === reportTeamID).length > 0
    } else {
      // this mean the backend is not yet fix so i will display the report for now
      return true
    }
  }
  return false
}

/**
 *
 * @description get teamIdList from teamList
 *                unsused for now
 *
 */
export const getTeamIdList = (teamList = []) => {
  return teamList.map((team) => team._id)
}
/**
 *
 * @description reportStatusInPinStyle (report.status)
 *
 */
export const getStyleStatusInPin = (status) => {
  if (ReportStatus.new === status) {
    return Colors.status.new
  } else
  if (ReportStatus.inProgress === status) {
    return Colors.status.inProgress
  } else
  if (ReportStatus.done === status) {
    return Colors.status.done
  } else
  if (ReportStatus.expired === status) {
    return Colors.status.expired
  } else {
    // default
    return Colors.status.new
  }
}

/**
 *
 * @description status fixer
 *              will be remove after backendn fixed type of report.status model
 *              from (strin[unresolve, resolve, expired]) to (int[0,1,2,3])
 *
 */
export const reportStatusFixer = (value) => {
  const statusType = ['Unresolved', 'Inprogress', 'Resolved', 'Expired'] // this array must match to ReportStatus in Constant
  if (parseInt(value) >= 0) {
    // this is mean that the status from report is int type
    return value
  } else {
    // this is mean that the status from report is string type
    // then convert string type to int type reportStatus Constant
    statusType.findIndex((status) => status.toUppreCase() === value.toUppreCase())
  }
}

/**
 *
 * @description sort cattegories && let others to end of array
 *
 */
export const sortCategories = (categoriesList) => {
  const categories = [].concat(categoriesList)
  // find others category
  const other = categories.filter((cat) => cat.name.toUpperCase() === 'other'.toUpperCase() || cat.name.toUpperCase() === 'overige'.toUpperCase())

  categories.sort((cur, next) => {
    const curN = cur.name.toUpperCase()
    const NexN = next.name.toUpperCase()
    if (curN < NexN) {
      return -1
    }
    if (curN > NexN) {
      return 1
    }
    return 0
  })
  if (other && other.length > 0) {
    return [...categories.filter((cat) => !(cat.name.toUpperCase() === 'other'.toUpperCase() || cat.name.toUpperCase() === 'overige'.toUpperCase())), ...other]
  }

  return categories
}

export const getReportTypesFilterSelect = (Lang) => {
  return [
    {
      name: Lang.publicSpace,
      code: 'A'
    },
    {
      name: Lang.suspiciousSituation,
      code: 'B'
    },
    {
      name: Lang.allReports,
      code: 'AB'
    }
  ]
}

const addressRemoveLastText = (text = '') => {
  const t = text.split(',')
  t.pop()
  return t.join(',')
}

export const formatMapSearchResult = (payload) => {
  return payload.results.map(
    d => {
      return {
        _id: d.place_id,
        title: d.name,
        subTitle: addressRemoveLastText(d.formatted_address),
        icon: d.icon,
        location: d.geometry.location
      }
    }
  )

}

// run hide keyboard nag callback
export const keyboardCb = (K, cb) => {
  K.dismiss()
  setTimeout(() => {
    cb()
  }, 1000)
}
