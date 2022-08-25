export default class unPossible extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 401;
    this.name = 'unPossible';
  }
}
