
class Logger {
  log(message: any) {
     console.log(message);
  }

  error(message: any) {
    console.error(message);
  }

  dir(value: any) {
    console.dir(value);
  }
}

export const logger = new Logger();
