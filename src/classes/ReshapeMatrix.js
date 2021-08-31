export default class ReshapeMatrix {
  constructor(elementsArr) {
    this.elementsArr = elementsArr
    this.maxRows = 1
    this.maxColumns = elementsArr.length
    this.elementsArrSize = elementsArr.length
  }

  reshape(newMaxRows, newMaxColumns) {
    if (
      newMaxRows * newMaxColumns !== this.elementsArrSize ||
      (newMaxRows === this.maxRows && newMaxColumns === this.maxColumns)
    ) {
      return false
    } else {
      this.maxRows = newMaxRows
      this.maxColumns = newMaxColumns
      return true
    }
  }

  reshapeWithCols(newMaxColumns) {
    this.maxColumns = newMaxColumns
    this.maxRows =
      Math.floor(this.elementsArrSize / newMaxColumns) +
      (this.elementsArrSize % newMaxColumns)
    return true
  }

  reshapeWithRows(newMaxRows) {
    this.maxRows = newMaxRows
    this.maxColumns =
      Math.floor(this.elementsArrSize / newMaxRows) +
      (this.elementsArrSize % newMaxRows)
    return true
  }

  getElement(row, col) {
    return this.elementsArr[row * this.maxColumns + col]
  }

  getRowAsArr(row) {
    var rowElements = []
    for (var col = 0; col < this.maxColumns; col++) {
      rowElements.push(this.getElement(row, col))
    }
    return rowElements
  }

  getColAsArr(col) {
    var colElements = []
    for (var row = 0; row < this.maxRows; row++) {
      colElements.push(this.getElement(row, col))
    }
    return colElements
  }
}
