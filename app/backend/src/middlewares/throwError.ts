export default class ThrowError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 404;
    this.name = 'ThrowError';
  }
}
