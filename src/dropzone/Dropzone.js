import React, { Component } from "react";
import "./Dropzone.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { highlight: false }
    this.fileInputRef = React.createRef()
  }

  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded = (evt) => {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const fileArray = this.fileListToArray(files)
      this.props.onFilesAdded(fileArray)

    }
  }

  fileListToArray = (list) => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  onDragLeave = () => {
    this.setState({ highlight: false })
  }

  onDragOver = (evt) => {
    evt.preventDefault();
    if (this.props.disabled) return;
    this.setState({ highlight: true })
  }

  onDrop = (evt) => {
    evt.preventDefault();
    if (this.props.disabled) return;

    const files = evt.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({ highlight: false })
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.highlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "cursor"}}
      >
        <img
          alt="upload"
          className="Icon"
          src="baseline-cloud_upload-24px.svg"
        />
        <input
         ref={this.fileInputRef}
         className="FileInput"
         type="file"
         multiple
         onChange={this.onFilesAdded}
        />
        <span>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;
