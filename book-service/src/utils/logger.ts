import winston from 'winston';
import { OpensearchTransport } from 'winston-opensearch';

const openSearchTransport = new OpensearchTransport({
  level: 'info',
  index: 'book-service-logs',
  clientOpts: {
    node: 'http://localhost:9200',
  },
});

export const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),

  transports: [
    new winston.transports.Console(),
    openSearchTransport,
  ],
});