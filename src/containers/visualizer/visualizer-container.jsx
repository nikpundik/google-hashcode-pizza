import React, { Component } from 'react';

import Visualizer from './visualizer';

import {
  getFile,
} from '../../utils/api';

import {
  renderStateToCanvas,
} from '../../utils/image';

import {
  fileToSolution,
  pizzaWithSlice,
} from '../../utils/io';

import {
  initialState,
  onToggleSetState,
  onSolutionSetState,
  onSolutionSuccessSetState,
  onFileLoadSetState,
  onFileLoadSetStateSuccess,
  onFileLoadSetStateFailure,
} from '../../utils/state';

class VisualizerContainer extends Component {
  constructor() {
    super();
    this.state = initialState();
    this.bindFunctions();
    this.setupReader();
  }

  bindFunctions() {
    this.load = this.load.bind(this);
    this.toggleSlices = this.toggleSlices.bind(this);
    this.uploadSolution = this.uploadSolution.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.setFileInput = this.setFileInput.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  setupReader() {
    this.reader = new FileReader();
    this.reader.onload = (e) => { 
      const solution = fileToSolution(e.target.result);
      const pizza = pizzaWithSlice(this.state.pizza, solution);
      this.setState(onSolutionSuccessSetState(pizza, solution));
    }
  }

  load(filename) {
    this.setState(onFileLoadSetState(filename));
    getFile(filename)
      .then((pizza) => {
        this.setState(onFileLoadSetStateSuccess(pizza));
      })
      .catch(() => {
        this.setState(onFileLoadSetStateFailure());
      });
  }

  toggleSlices() {
    this.setState(onToggleSetState(this.state.slices));
  }

  openFileDialog() {
    this.fileInput.click();
  }

  uploadSolution(e) {
    if (e.target.files && e.target.files.length) {
      this.setState(onSolutionSetState());
      this.reader.readAsText(e.target.files[0]);
    }
  }

  setFileInput(input) {
    this.fileInput = input;
  }

  renderCanvas(canvas) {
    renderStateToCanvas(canvas, this.state);
  }

  render() {
    return (
      <Visualizer
        uploadSolution={this.uploadSolution}
        setFileInput={this.setFileInput}
        load={this.load}
        toggleSlices={this.toggleSlices}
        openFileDialog={this.openFileDialog}
        renderCanvas={this.renderCanvas}
        pizza={this.state.pizza}
        loading={this.state.loading}
        solution={this.state.solution}
        filename={this.state.filename}
      />
    );
  }
}

export default VisualizerContainer;
