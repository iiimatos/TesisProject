export const getMessageRequest = (message: string) => {
  switch (message) {
    case 'Identifier or password invalid.':
      return 'Usuario o contraseña incorrecta';
    default:
      'Error, comuniquece con algun administrador por favor';
  }
};
