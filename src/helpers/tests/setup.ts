import { clearDatabase } from './clear-database';
import { beforeEach } from 'vitest';

beforeEach(async () => {
  await clearDatabase();
});
