import {Middleware, MiddlewareContext, response} from '@loopback/rest';
import {logger} from '../utils/logger';

export const requestlogger:Middleware=async(ctx:MiddlewareContext,next,)=>{
    const start = Date.now();
    const {request} =ctx;

    logger.info({
        type:'HTTP_REQUEST',
        method:request.method,
        url:request.url,
        message:'Request Started',
    });

    const result = await next();
    const duration = Date.now() - start;

    logger.info({
        type:'HTTP_RESPONSE',
        method:request.method,
        url:request.url,
        message:'Request Completed',
    });
    return result;
}