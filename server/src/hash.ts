import secret from './secret';
import crypto from 'crypto';
export default (id:string, pass:string) => {
    return crypto.createHash('sha512').update(`${id}${secret.secret}${pass}`).digest('base64');
};