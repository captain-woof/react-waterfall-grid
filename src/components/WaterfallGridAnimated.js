import React, { useState, useMemo } from 'react'
import ReshapeMatrix from '../classes/ReshapeMatrix'
import ReactResizeObserver from 'rc-resize-observer'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

export default function WaterfallGridAnimated({
  styleGridContainer,
  styleGridColumn,
  childWidth,
  childItems,
  propsAnimatePresence,
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
  const [columnContainersArr, setColumnContainersArr] = useState([])

  // Function that fills up column containers with elements
  // `childItemArr` is the element matrix
  const fillupColumnContainers = () => {
    let columnContainersArr = []
    for (let col = 0; col < childItemArr.maxColumns; col++) {
      columnContainersArr.push(
        <motion.div
          className='waterfall-grid-animated-row-container'
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
    setColumnContainersArr(columnContainersArr)
  }

  // Function to handle columns container resize event
  // Reshapes the matrix
  const handleColumnsContainerResize = ({ width }) => {
    childItemArr.reshapeWithCols(Math.floor(width / childWidth))
    fillupColumnContainers()
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
            {columnContainersArr}
          </motion.div>
        </AnimateSharedLayout>
      </AnimatePresence>
    </ReactResizeObserver>
  )
}
