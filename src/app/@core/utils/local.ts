import { ISession } from '../models/session.interfaces';

export const getSession = (): ISession => {
  return JSON.parse(localStorage.getItem('session') || '{}');
};

export const resetSession = () => {
  localStorage.removeItem('session');
};
