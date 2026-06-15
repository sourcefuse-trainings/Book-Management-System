import {Observer} from './observer.interface';
import { logger } from '../utils/logger';
export class LoggerObserver implements Observer{
    update(message:string):void{
        logger.info({
            type:'Book_Event',
            message:message,
            layer:'LoggerObserver',
        });
    }
}

