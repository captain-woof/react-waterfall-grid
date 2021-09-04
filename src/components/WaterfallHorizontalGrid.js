import React, { useState, useMemo } from 'react'
import ReshapeMatrix from '../classes/ReshapeMatrix'
import ReactResizeObserver from 'rc-resize-observer'

// Function that fills up row containers with elements
// `childItemArr` is the element matrix
const fillupRowContainers = (childItemArr, styleGridRow, propsGridRow, setRowContainersArr) => {
  let rowContainersArr = []
  for (let row = 0; row < childItemArr.maxRows; row++) {
    rowContainersArr.push(
      <div
        className='waterfall-horizontal-grid-row-container'
        style={{
          display: 'flex',
          flexDirection: 'row',
          ...styleGridRow
        }}
        key={row}
        {...propsGridRow}
      >
        {childItemArr.getRowAsArr(row)}
      </div>
    )
  }
  setRowContainersArr(rowContainersArr)
}

export default function WaterfallHorizontalGrid({ styleGridContainer, styleGridRow,
  childHeight, childItems, propsGridContainer, propsGridRow }) {
  // `childItems` is an array of elements to render, each having width `childWidth`
  const childItemArr = useMemo(() => (
    new ReshapeMatrix(undefined, 0)
  ), [])

  // When 'childItems' changes, render whole grid
  useEffect(() => {
    childItemArr.replaceAllByElems(childItems)
    fillupColumnContainers(childItemArr, styleGridRow, propsGridRow, setRowContainersArr)
  }, [childItems, childItemArr, styleGridRow, propsGridRow])

  // State for grid contents (row containers)
  const [rowContainersArr, setRowContainersArr] = useState([])

  // Function to handle grid container resize event
  // Reshapes the matrix
  const handleGridContainerResize = ({ height }) => {
    childItemArr.reshapeWithRows(Math.floor(height / childHeight))
    fillupColumnContainers(childItemArr, styleGridRow, propsGridRow, setRowContainersArr)
  }

  // Render
  return (
    <ReactResizeObserver onResize={handleGridContainerResize}>
      <div
        className='waterfall-horizontal-grid-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          ...styleGridContainer
        }}
        {...propsGridContainer}
      >
        {rowContainersArr}
      </div>
    </ReactResizeObserver>
  )
}
