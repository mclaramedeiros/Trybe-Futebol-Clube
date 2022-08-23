export default class BadRequest extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 400;
    this.name = 'BadRequest';
  }
}
