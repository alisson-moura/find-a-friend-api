export class Status {
  private dateOfAdoption: Date | null;

  constructor (dateOfAdoption: Date | null) {
    this.dateOfAdoption = dateOfAdoption;
  }

  isAvailable (): boolean {
    return this.dateOfAdoption === null;
  }

  adoption (): void {
    this.dateOfAdoption = new Date();
  }
}
