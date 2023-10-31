export class Coordinate {
  readonly #lat: number;
  readonly #long: number;

  constructor ({ lat, long }: { lat: number, long: number }) {
    this.#lat = lat;
    this.#long = long;
  }

  getCoordinates (): { lat: number, long: number } {
    return {
      lat: this.#lat,
      long: this.#long
    };
  }
}
