import { getImageData } from './image';

export const initialState = () => ({
  filename: null,
  slices: false,
  pizza: null,
  solution: null,
  loading: false,
});

export const onToggleSetState = slices => ({
  slices: !slices,
});

export const onSolutionSetState = () => ({
  loading: true,
});

export const onSolutionSuccessSetState = (pizza, solution) => ({
  pizza,
  solution,
  imageDataSlice: getImageData(pizza),
  loading: false,
  slices: true,
});

export const onFileLoadSetState = filename => ({
  loading: true,
  imageDataOriginal: null,
  imageDataSlice: null,
  slices: false,
  filename,
});

export const onFileLoadSetStateSuccess = pizza => ({
  pizza,
  loading: false,
  solution: null,
  imageDataOriginal: getImageData(pizza),
});

export const onFileLoadSetStateFailure = () => ({
  pizza: null,
  loading: false,
  solution: null,
});
