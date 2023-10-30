export enum SizeClassification {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
  EXTRA_LARGE = 'Extra Large',
}

export interface SizeCriteria {
  SMALL: number
  MEDIUM: number
  LARGE: number
  EXTRA_LARGE: number
};

export class Size {
  private readonly size: number;
  private readonly sizeCriteria: SizeCriteria;

  constructor (size: number, sizeCriteria: SizeCriteria) {
    this.size = size;
    this.sizeCriteria = sizeCriteria;
  }

  get classification (): SizeClassification {
    if (this.size <= this.sizeCriteria.SMALL) return SizeClassification.SMALL;
    if (this.size <= this.sizeCriteria.MEDIUM) return SizeClassification.MEDIUM;
    if (this.size <= this.sizeCriteria.LARGE) return SizeClassification.LARGE;
    return SizeClassification.EXTRA_LARGE;
  }
}
