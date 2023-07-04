import { LOG_LEVEL } from "../enums";

export const writeLog = (logLevel: LOG_LEVEL, error: any) => {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(`[${time}] [${logLevel}] ${error}`);
    if(logLevel === LOG_LEVEL.ERROR) console.log(error.stack);
}