class Err extends Error {
  statusCode?: number;
  code?: number | string;
  errors?: any;

  constructor(
    message: string,
    name: string,
    statusCode?: number,
    code?: number | string,
    errors?: any
  ) {
    super(message);
    this.name = name || "NexuErr";
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;

    Object.setPrototypeOf(this, Err.prototype);
  }
}

export default Err;
