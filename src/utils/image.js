export const getImageData = (pizza) => {
  const imageData = new ImageData(pizza.cols, pizza.rows);
  var buf = new ArrayBuffer(imageData.data.length);
  var buf8 = new Uint8ClampedArray(buf);
  var data = new Uint32Array(buf);

  let color;
  const canvasWidth = pizza.cols;
  pizza.pieces.forEach((piece) => {
    if (!piece.taken) color = piece.color;
    else color = piece.takenColor;
    data[piece.y * canvasWidth + piece.x] =
      (255 << 24) |
      (color[2] << 16) |
      (color[1] << 8) |
       color[0];
  });
  imageData.data.set(buf8);
  return imageData;
};

export const renderStateToCanvas = (canvas, {
  pizza, loading, slices, imageDataSlice, imageDataOriginal,
}) => {
  if (!canvas || !pizza || loading) return;
  const imageData = slices ? imageDataSlice : imageDataOriginal;
  canvas.width = pizza.cols;
  canvas.height = pizza.rows;
  canvas.getContext("2d").putImageData(imageData, 0, 0);
};
