import React from 'react';

import Board from '../../components/board';

import './visualizer.css';

const Visualizer = ({
  uploadSolution,
  setFileInput,
  load,
  toggleSlices,
  openFileDialog,
  renderCanvas,
  pizza,
  loading,
  solution,
  filename,
}) => (
  <div>
    <input
      type="file"
      onChange={uploadSolution}
      ref={input => setFileInput(input)}
    />
    <Board
      pizza={pizza}
      loading={loading}
      solution={solution}
      currentFilename={filename}
      load={load}
      toggleSlices={toggleSlices}
      openFileDialog={openFileDialog}
    />
    { loading && <div className="loading">LOADING</div> }
    <div className="pizza">
      <canvas ref={canvas => renderCanvas(canvas)} />
    </div>
  </div>
);

export default Visualizer;
