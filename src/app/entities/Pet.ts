import { randomUUID } from 'crypto';
import { AnimalFactory } from './Animal';
import { Photo } from './value-objects/Photo';
import { Status } from './value-objects/Status';
import { type Animal } from './Animal/Animal';
import { type Org, type OrgContact } from './Org';

export interface PetProps {
  id: string
  org: Org
  name: string
  bio: string
  requirements: string[]
  energyLevel: number
  independenceLevel: number
  animal: Animal
  status: Status
  photos: Photo[]
}

export interface PetPropsConstructor {
  id?: string
  name: string
  bio: string
  org: Org
  requirements: string[]
  energyLevel: number
  independenceLevel: number
  dateOfAdoption: Date | null
  animal: {
    type: string
    dateOfBirth: Date
    size: number
  }
  photos: string[]
}

export interface PetInfos {
  id: string
  org: OrgContact
  name: string
  bio: string
  requirements: string[]
  energyLevel: number
  independenceLevel: number
  animal: {
    type: string
    age: {
      age: number
      classification: string
    }
    size: {
      size: number
      classification: string
    }
  }
  status: boolean
  photos: string[]
}

export class Pet {
  private readonly props: PetProps;

  constructor (props: PetPropsConstructor) {
    const petProps: PetProps = {
      id: props.id ?? randomUUID(),
      org: props.org,
      name: props.name,
      bio: props.bio,
      requirements: props.requirements,
      energyLevel: props.energyLevel,
      independenceLevel: props.independenceLevel,
      animal: AnimalFactory.create(props.animal),
      status: new Status(props.dateOfAdoption),
      photos: props.photos.map(p => new Photo(p))
    };

    this.props = petProps;
  }

  get status (): Status {
    return this.props.status;
  }

  removeRequirement (requirement: string): void {
    const index = this.props.requirements.indexOf(requirement);
    if (index !== -1) {
      this.props.requirements.splice(index, 1);
    }
  }

  updateName (name: string): void {
    this.props.name = name;
  }

  updateBio (bio: string): void {
    this.props.bio = bio;
  }

  updateEnergyLevel (energyLevel: number): void {
    this.props.energyLevel = energyLevel;
  }

  updateIndependenceLevel (independenceLevel: number): void {
    this.props.independenceLevel = independenceLevel;
  }

  addRequirement (requirement: string): void {
    this.props.requirements.push(requirement);
  }

  addPhoto (url: string): void {
    const photo = new Photo(url);
    this.props.photos.push(photo);
  }

  get info (): PetInfos {
    return {
      org: this.props.org.contact,
      id: this.props.id,
      name: this.props.name,
      bio: this.props.bio,
      requirements: this.props.requirements,
      energyLevel: this.props.energyLevel,
      independenceLevel: this.props.independenceLevel,
      animal: {
        type: this.props.animal.type,
        age: this.props.animal.age,
        size: this.props.animal.size
      },
      status: this.props.status.isAvailable(),
      photos: this.props.photos.map(p => p.url)
    };
  }
}
