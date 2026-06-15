import {Observer} from './observer.interface';
import {logger} from '../utils/logger';
export class AuditObserver implements Observer{
    update(message:string):void{
       logger.info({
        type:'Audit_Event',
        message:message,
        layer:'AuditObserver',
       });
    }
}

