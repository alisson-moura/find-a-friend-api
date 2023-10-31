import { type Org } from '../entities/Org';

export interface OrgRepository extends
  SearchOrgByIdRepository,
  SearchOrgByEmailRepository,
  CreateOrgRepository { }

export interface SearchOrgByIdRepository {
  find: (orgId: string) => Promise<Org | null>
}

export interface SearchOrgByEmailRepository {
  find: (orgEmail: string) => Promise<Org | null>
}

export interface CreateOrgRepository {
  create: (org: Org) => Promise<Org>
}
