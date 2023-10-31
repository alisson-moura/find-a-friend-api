import { type Org } from '../entities/Org';

export interface OrgRepository extends SearchOrgRepository { }

export interface SearchOrgRepository {
  findById: (orgId: string) => Promise<Org | null>
}
