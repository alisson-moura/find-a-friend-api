import { type Org } from '../entities/Org';

export interface OrgRepository {
  findById: (orgId: string) => Promise<Org | null>
}
