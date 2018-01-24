import React from 'react';

import { files } from '../../utils/io';

import './board.css';

const getCompleted = (pizza, solution) => (solution.points / pizza.pieces.length * 100).toFixed(2);

const Board = ({
  pizza,
  loading,
  solution,
  currentFilename,
  load,
  openFileDialog,
  toggleSlices,
}) => (
  <div className="board-container">
    <div className="board">
      <div>GOOGLE HASHCODE PIZZA</div>
      <div>Choose input:</div>
      <div className="input-buttons">
        { files.map((filename, i) => 
          <div
            key={i}
            className={filename === currentFilename ? 'clickable selected' : 'clickable'}
            onClick={() => load(filename)}
          >
            {filename}
          </div>
        ) }
      </div>
      { pizza && !loading && 
        <div className="clickable" onClick={openFileDialog}>
          CLICK HERE TO UPLOAD YOUR SOLUTION
        </div>
      }
      { pizza && !loading && solution && 
        <div>
          POINTS: {solution.points} ({getCompleted(pizza, solution)}%)
          {' | '}
          <span className="clickable" onClick={toggleSlices}>TOGGLE</span>
        </div>
      }
    </div>
  </div>
);

export default Board;
