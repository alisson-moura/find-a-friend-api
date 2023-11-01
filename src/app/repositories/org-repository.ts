import { type Org } from '../entities/Org';

export interface OrgRepository extends
  SearchOrgByIdRepository,
  SearchOrgByEmailRepository,
  CreateOrgRepository { }

export interface SearchOrgByIdRepository {
  findById: (orgId: string) => Promise<Org | null>
}

export interface SearchOrgByEmailRepository {
  findByEmail: (orgEmail: string) => Promise<Org | null>
}

export interface CreateOrgRepository {
  create: (org: Org) => Promise<Org>
}
