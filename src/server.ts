import { env } from './env';
import app from './http';

app.listen({ port: env.HTTP_PORT })
  .then(() => {
    console.log('🚀 API running on http://localhost:' + env.HTTP_PORT);
  })
  .catch(err => {
    app.log.error(err);
    process.exit(1);
  });
