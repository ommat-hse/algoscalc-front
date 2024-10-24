export class AppError extends Error {
  public readonly redirectToHome: boolean;

  constructor(message: string, redirectToHome: boolean = false) {
    super(message);
    this.redirectToHome = redirectToHome;
  }
}
