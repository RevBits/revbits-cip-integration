function showLogs(): boolean {
  return !!(process.env && process.env.HIDE_CIP_LOGS !== 'true');
}

function log(consoleMethod: keyof Console, ...messages: any[]): void {
  if (showLogs()) {
    (console[consoleMethod] as (...data: any[]) => void)(...messages);
  }
}

function info(...messages: any[]): void {
  log('info', ...messages);
}

function warn(...messages: any[]): void {
  log('warn', ...messages);
}

function error(...messages: any[]): void {
  log('error', ...messages);
}

export const logger = {
  info,
  warn,
  error,
};
