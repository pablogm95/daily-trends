export class CustomError extends Error {
  /**
   * @param {string} message Internal message
   */
  constructor(message: string) {
    super(message)
    this.message = message
  }

  toJSON() {
    return {
      message: this.message,
    }
  }
}
