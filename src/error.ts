export class DoubleZeroError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DoubleZeroError';
  }
}
