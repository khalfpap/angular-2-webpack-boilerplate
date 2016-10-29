// this is the main entry point into our application
// it bootstraps the Angular application

if (process.env.ENV === 'production') {
  // TODO enable production mode
  console.log('enabled production mode!')
}

export function bootstrap() {
  // TODO bootstrap app
  setTimeout(() => {
    document.querySelector('.app').innerHTML = 'bootstrap successful!';
  }, 1000);
}
