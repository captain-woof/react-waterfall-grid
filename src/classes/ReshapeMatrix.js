export default class ReshapeMatrix {
  constructor(elementsArr, whatToPrioritise) {
    this.elementsArr = elementsArr || []
    this.maxRows = 1
    this.maxColumns = this.elementsArr.length
    this.elementsArrSize = this.elementsArr.length
    this.whatToPrioritise = whatToPrioritise || 1 // This shows what (0-Row,1-Col) to keep constant during 'adjust()'
  }

  changeWhatToPrioritise(newWhatToPrioritise) {
    if ((newWhatToPrioritise === 0) || (newWhatToPrioritise === 1)) {
      this.whatToPrioritise = newWhatToPrioritise
    } else {
      return false
    }
  }

  getAll() {
    return this.elementsArr
  }

  adjust() {
    if (this.whatToPrioritise === 1) { // If columns have priority
      this.maxRows = Math.floor(this.elementsArr.length / this.maxColumns) +
        (Boolean(this.elementsArr.length % this.maxColumns) ? 1 : 0)
    } else {
      this.maxColumns = Math.floor(this.elementsArr.length / this.maxRows) +
        (Boolean(this.elementsArr.length % this.maxRows) ? 1 : 0)
    }
  }

  replaceAllByElems(newElems) {
    this.elementsArr = newElems
    this.adjust()
  }

  append(newElements) {
    this.elementsArr.concat(newElements)
    this.adjust()
  }

  deleteEle(elementToDelete) {
    this.elementsArr.splice(this.elementsArr.indexOf(elementToDelete), 1)
    this.adjust()
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
    this.adjust()
    return true
  }

  reshapeWithRows(newMaxRows) {
    this.maxRows = newMaxRows
    this.adjust()
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