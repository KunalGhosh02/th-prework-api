import 'dotenv/config';

import { app } from './src/express';
import { connectToDB } from './src/utils/database';
import { writeLog } from './src/utils/helpers/log.helper';
import { LOG_LEVEL } from './src/utils/enums';

const port = process.env.PORT || 3001;

connectToDB().then(_ => {
  app.listen(port, () => {
    writeLog(LOG_LEVEL.INFO, `Server started on port ${port}`);
  });
}).catch((err) => {
    writeLog(LOG_LEVEL.ERROR, err);
});
