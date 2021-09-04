import React, { useState, useMemo, useEffect } from 'react'
import ReshapeMatrix from '../classes/ReshapeMatrix'
import ReactResizeObserver from 'rc-resize-observer'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

// Function that fills up column containers with elements
// `childItemArr` is the element matrix
const fillupColumnContainers = (childItemArr, styleGridColumn, propsGridColumn, setGridContainersArr) => {
  let columnContainersArr = []
  for (let col = 0; col < childItemArr.maxColumns; col++) {
    columnContainersArr.push(
      <motion.div
        className='waterfall-grid-animated-column-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          ...styleGridColumn
        }}
        key={col}
        {...propsGridColumn}
      >
        {childItemArr.getColAsArr(col)}
      </motion.div>
    )
  }
  setGridContainersArr(columnContainersArr)
}

export default function WaterfallGridAnimated({ styleGridContainer, styleGridColumn,
  childWidth, childItems, propsAnimatePresence, propsGridContainer, propsGridColumn }) {
  // `childItems` is an array of elements to render, each having width `childWidth`
  const childItemArr = useMemo(() => (
    new ReshapeMatrix()
  ), [])

  // When 'childItems' changes, render whole grid
  useEffect(() => {
    childItemArr.replaceAllByElems(childItems)
    fillupColumnContainers(childItemArr, styleGridColumn, propsGridColumn, setGridContainersArr)
  }, [childItems, childItemArr, styleGridColumn, propsGridColumn])

  // State for grid contents (column containers)
  const [gridContainersArr, setGridContainersArr] = useState([])

  // Function to handle columns container resize event
  // Reshapes the matrix
  const handleColumnsContainerResize = ({ width }) => {
    childItemArr.reshapeWithCols(Math.floor(width / childWidth))
    fillupColumnContainers(childItemArr, styleGridColumn, propsGridColumn, setGridContainersArr)
  }

  // Render
  return (
    <ReactResizeObserver onResize={handleColumnsContainerResize}>
      <AnimatePresence {...propsAnimatePresence}>
        <AnimateSharedLayout type='crossfade'>
          <motion.div
            className='waterfall-grid-animated-container'
            layout
            style={{
              display: 'flex',
              flexDirection: 'row',
              ...styleGridContainer
            }}
            {...propsGridContainer}
          >
            {gridContainersArr}
          </motion.div>
        </AnimateSharedLayout>
      </AnimatePresence>
    </ReactResizeObserver>
  )
}