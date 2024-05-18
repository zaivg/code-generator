import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var bodyParser = require('body-parser');

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json());

  app.listen(port, host,
    () => {
      const appServer = app.getHttpServer().address()
      console.log(`Server started on port ${appServer.address} : ${appServer.port}`)
    });
}
bootstrap();
