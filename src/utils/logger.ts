function showLogs(): boolean {
  return !!(process.env && process.env.HIDE_CIP_LOGS !== 'true');
}

function log(consoleMethod: keyof Console, ...messages: any[]): void {
  if (showLogs()) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    });

    const formattedMessages = messages.map((message) => `[CIP] [${formattedDate} ${formattedTime}] ${message}`);
    (console[consoleMethod] as (...data: any[]) => void)(...formattedMessages);
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
