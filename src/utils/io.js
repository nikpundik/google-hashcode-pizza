const tColor = [222, 28, 47];
const mColor = [221, 136, 153];
const tColorTaken = [30, 30, 30];
const mColorTaken = [60, 60, 60];

const toInt = n => parseInt(n, 10);
const pieceKey = (x, y) => `${x}-${y}`;
const typeColor = type => type === 'M' ? mColor : tColor;
const takenColor = type => type === 'M' ? mColorTaken : tColorTaken;

export const files = ['example', 'small', 'medium', 'big'];

export const fileToPizza = (file) => {
  const pizza = {};
  const lines = file.split('\n');
  const desc = lines.shift().split(' ');
  pizza.rows = toInt(desc[0]);
  pizza.cols = toInt(desc[1]);
  pizza.pieces = [];
  pizza.piecesMap = {};
  lines.forEach((line, y) => line.split('').forEach((type, x) => {
    const piece = {
      x: toInt(x),
      y: toInt(y),
      key: pieceKey(x, y),
      type,
      color: typeColor(type),
      taken: false,
    };
    pizza.pieces.push(piece);
    pizza.piecesMap[piece.key] = piece;
  }));
  return pizza;
};

export const fileToSolution = (file) => {
  const solution = {
    points: 0,
    pieces: [],
  };
  const lines = file.split('\n');
  lines.shift();

  lines.forEach((line) => {
    const slice = line.split(' ').map(toInt);
    for (let y = slice[0]; y <= slice[2]; y += 1) {
      for (let x = slice[1]; x <= slice[3]; x += 1) {
        solution.pieces.push({ x, y });
        solution.points += 1;
      }
    }
  });
  return solution;
};

export const pizzaWithSlice = (pizza, solution) => {
  solution.pieces.forEach(({ x, y }) => {
    const piece = pizza.piecesMap[pieceKey(x, y)];
    if (piece) {
      piece.taken = true;
      piece.takenColor = takenColor(piece.type);
    }
  });
  return pizza;
};
