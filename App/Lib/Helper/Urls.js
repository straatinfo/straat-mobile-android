import { Url, Keys } from './../../Services/Constant'
import AppConfig from './../../Config/AppConfig'



// has / at the end of url
const BASEURL = AppConfig.ApiUrl

/**
 * @description: url helpers
 * @requires ~/app/constant
 * @author: ArC
 * @return: none
 */

export const Urls = {
    /**
     * @description generate googlemap api url
     * @param : ( longitude, latitude )
     * @return: url ( string ) 
     */

  getGoogleMapApis: function (longitude, latitude) {
    return Url.GOOGLEAPIS + 'maps/api/geocode/json?latlng=' + JSON.stringify(latitude) + ',' + JSON.stringify(longitude) + '&key=' + Keys.GOOGLE_MAP_KEY
  },

  getUrlHostId: function (lat, long, radius) {
    return BASEURL + 'v1/api/hosttemp/getHostId?lat=' + lat.toString() + '&long=' + long.toString() + '&radius=' + radius.toString()
  },

    /**
     * @description because fetch function cant accept body object in get or head request, convert obj to string and add to url
     * @param : ( url, paramObject )
     * @return: url ( string )
     */

  convertObjtoParamString: (url, paramObject) => {
    return url + '?' + Object.keys(paramObject)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(paramObject[key]))
            .join('&')
            .replace(/%20/g, '+')
  }

}
