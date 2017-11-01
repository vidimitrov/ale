import * as moment from 'moment';
import * as _ from 'lodash';

export class ScheduleService {
  static checkIfTodayIsWorkingDay(workingDays) {
    // moment().isoWeekday() is returning the week day number from 1 to 7 (Monday to Sunday)
    const currentWeekday = moment().isoWeekday();
    return _.indexOf(workingDays, currentWeekday) >= 0;
  }

  static checkIfInTheMomentIsOpen(openFrom, openTo) {
    const beginning = moment(openFrom, 'HH mm');
    const end = moment(openTo, 'HH mm');
    const now = moment(moment().format('HH mm'), 'HH mm');

    if (beginning.isBefore(end)) {
      return now.isAfter(beginning) && now.isBefore(end);
    }

    if (end.isBefore(beginning)) {
      return now.isAfter(beginning) || now.isBefore(end);
    }

    return true;
  }

  static getStatus(from, to, workingDays) {
    return this.checkIfTodayIsWorkingDay(workingDays) && this.checkIfInTheMomentIsOpen(from, to);
  }
}

export default ScheduleService;
