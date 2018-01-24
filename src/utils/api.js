import { fileToPizza } from './io';

export const getFile = filename =>
  fetch(`in/${filename}.in`)
    .then(response => response.text())
    .then((data) => fileToPizza(data));
