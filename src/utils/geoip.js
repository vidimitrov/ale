export class NoIpToLocationMatchError extends Error {
  constructor() {
    super(NoIpToLocationMatchError.name.split(/(?=[A-Z])/).join(''));
    Object.setPrototypeOf(this, NoIpToLocationMatchError.prototype);
    this.name = NoIpToLocationMatchError.name;
  }
}

export function getError(response) {
  if (response.msg === 'No record found.') {
    return NoIpToLocationMatchError;
  }

  return Error;
};

export async function getLocation(ipAddress = '') {
  const response = await fetch(`http://geoip.nekudo.com/api/${ipAddress}`);
  const parsedResponse = await response.json();

  if (parsedResponse.type === 'error') {
    throw new (getError(parsedResponse))();
  }

  return parsedResponse;
}
