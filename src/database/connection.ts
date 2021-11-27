import { connect, connection } from 'mongoose';
import { ConnectionOptions } from 'tls';
import { CustomError } from '../errors/CustomError';

const databaseUrl: string | undefined = process.env.MONGODB_URI;

if (!databaseUrl) {
  throw new CustomError('MONGODB_URI not found', 404);
}
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mongooseConnection = connect(
  databaseUrl,
  mongooseOptions as ConnectionOptions,
);

const checkConnection = connection;

checkConnection.on('error', error => console.log(error));

checkConnection.once('open', () => console.log('--- Connected to MongoDB ---'));

export { mongooseConnection };
