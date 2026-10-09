import fs from 'fs';
import path from 'path';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const log = (level: LogLevel, message: string, meta?: any): void => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}${meta ? ' ' + JSON.stringify(meta) : ''}\n`;

  console.log(logMessage.trim());

  if (process.env.NODE_ENV === 'production') {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFileSync(path.join(logDir, 'server.log'), logMessage);
  }
};

export default {
  error: (message: string, meta?: any) => log('error', message, meta),
  warn: (message: string, meta?: any) => log('warn', message, meta),
  info: (message: string, meta?: any) => log('info', message, meta),
  debug: (message: string, meta?: any) => log('debug', message, meta),
};
