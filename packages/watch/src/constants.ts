export const CHOKIDAR_AVAILABLE_OPTIONS = [
  'alwaysStat',
  'atomic',
  'awaitWriteFinish',
  'binaryInterval',
  'cwd',
  'depth',
  'disableGlobbing',
  'followSymlinks',
  'ignored',
  'ignoreInitial',
  'ignorePermissionErrors',
  'interval',
  'persistent',
  'usePolling',
];

// default file delimiter is a whitespace
export const FILE_DELIMITER = ' ';

// threshold to hold before firing a single event with merged files
export const EMIT_CHANGES_DELAY = 100;