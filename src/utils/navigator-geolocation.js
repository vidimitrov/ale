import * as _ from 'lodash';

export class BrowserGeolocationNotSupportedError extends Error {
  constructor() {
    super(BrowserGeolocationNotSupportedError.name.split(/(?=[A-Z])/).join(''));
    Object.setPrototypeOf(this, BrowserGeolocationNotSupportedError.prototype);
    this.name = BrowserGeolocationNotSupportedError.name;
  }
}

export const isNotSupported = () => {
  const positionHandler = _.get(navigator, 'geolocation.getCurrentPosition');
  const isMissingHandler = _.isNil(positionHandler);
  return isMissingHandler;
}

/**
 * @throws {BrowserGeolocationNotSupportedError}
 * navigator.geolocation.getCurrentPosition must be an existing method in the browser
 * @throws {PositionError} on permission denied, timeout or position unavailable
 */
export const getCurrentPosition = async (options) =>
  new Promise((resolve, reject) => {
    const isUnsupported = isNotSupported()

    if (isUnsupported) {
      reject(new BrowserGeolocationNotSupportedError())
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      // Possible error scenarios handled by the caller:
      // error.code === (1 || 2 || 3)
      // 1	PERMISSION_DENIED
      // 2	POSITION_UNAVAILABLE - generic error
      // 3	TIMEOUT - try again with PositionOptions by setting timeout to high number
      (error) => reject(error))
  })
