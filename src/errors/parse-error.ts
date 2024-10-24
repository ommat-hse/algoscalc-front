import { AppError } from "./app-error";

export class ParseError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
