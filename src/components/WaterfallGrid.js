import React, { useState, useMemo } from 'react'
import ReshapeMatrix from '../classes/ReshapeMatrix'
import ReactResizeObserver from 'rc-resize-observer'

export default function WaterfallGrid({
  styleGridContainer,
  styleGridColumn,
  childWidth,
  childItems,
  propsGridContainer,
  propsGridColumn
}) {
  // Memoize `childItems`
  // `childItems` is an array of elements to render, each having width `childWidth`
  const childItemArr = useMemo(
    () => new ReshapeMatrix(childItems),
    [childItems]
  )

  // State for grid contents (column containers)
  const [gridContainersArr, setGridContainersArr] = useState([])

  // Function that fills up column containers with elements
  // `childItemArr` is the element matrix
  const fillupColumnContainers = () => {
    let columnContainersArr = []
    for (let col = 0; col < childItemArr.maxColumns; col++) {
      columnContainersArr.push(
        <div
          className='waterfall-grid-column-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            ...styleGridColumn
          }}
          key={col}
          {...propsGridColumn}
        >
          {childItemArr.getColAsArr(col)}
        </div>
      )
    }
    setGridContainersArr(columnContainersArr)
  }

  // Function to grid container resize event
  // Reshapes the matrix
  const handleColumnsContainerResize = ({ width }) => {
    childItemArr.reshapeWithCols(Math.floor(width / childWidth))
    fillupColumnContainers()
  }

  // Render
  return (
    <ReactResizeObserver onResize={handleColumnsContainerResize}>
      <div
        className='waterfall-grid-container'
        style={{
          display: 'flex',
          flexDirection: 'row',
          ...styleGridContainer
        }}
        {...propsGridContainer}
      >
        {gridContainersArr}
      </div>
    </ReactResizeObserver>
  )
}
