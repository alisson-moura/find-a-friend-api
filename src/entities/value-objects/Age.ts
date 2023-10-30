export enum AgeClassification {
  PUPPY = 'Puppy',
  YOUNG = 'Young',
  ADULT = 'Adult',
  ELDERLY = 'Elderly',
};

export interface AgeCriteria {
  PUPPY: number
  YOUNG: number
  ADULT: number
  ELDERLY: number
};

export class Age {
  private readonly dateOfBirth: Date;
  private readonly ageCriteria: AgeCriteria;

  constructor (dateOfBirth: Date, ageCriteria: AgeCriteria) {
    this.dateOfBirth = dateOfBirth;
    this.ageCriteria = ageCriteria;
  }

  age (): number {
    const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;
    const differenceInMs = new Date().getTime() - this.dateOfBirth.getTime();
    return Math.floor(differenceInMs / MILLISECONDS_PER_YEAR);
  }

  classification (): AgeClassification {
    const currentAge = this.age();
    if (currentAge <= this.ageCriteria.PUPPY) return AgeClassification.PUPPY;
    if (currentAge <= this.ageCriteria.YOUNG) return AgeClassification.YOUNG;
    if (currentAge <= this.ageCriteria.ADULT) return AgeClassification.ADULT;
    return AgeClassification.ELDERLY;
  }
}
