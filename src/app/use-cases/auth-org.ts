import { type SearchOrgByEmailRepository } from '../../app/repositories/org-repository';
import { IncorrectCredentials } from './errors/incorrect-credentials';

interface Request {
  email: string
  password: string
}
interface Response {
  id: string
}
export class AuthOrgUseCase {
  constructor (
    private readonly orgRepository: SearchOrgByEmailRepository
  ) {}

  async execute (props: Request): Promise<Response> {
    const org = await this.orgRepository.findByEmail(props.email);
    if (org == null) throw new IncorrectCredentials();

    const credentialsAreValid = await org.validateCredentials(props);
    if (credentialsAreValid) {
      return {
        id: org.contact.id
      };
    }

    throw new IncorrectCredentials();
  }
}
