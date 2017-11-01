const cn = console;

export const Logger = {
  log(filePath, logType, logMessage) {
    cn.log(filePath, logType, logMessage);
  },
  warn(filePath, logType, logMessage) {
    cn.warn(filePath, logType, logMessage);
  },
  error(filePath, logType, logMessage) {
    cn.error(filePath, logType, logMessage);
  },
};
