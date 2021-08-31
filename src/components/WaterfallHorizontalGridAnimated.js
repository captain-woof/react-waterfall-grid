import React, { useState, useMemo } from 'react'
import ReshapeMatrix from '../classes/ReshapeMatrix'
import ReactResizeObserver from 'rc-resize-observer'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

export default function WaterfallHorizontalGridAnimated({
  styleGridContainer,
  styleGridRow,
  childHeight,
  childItems,
  propsAnimatePresence,
  propsGridContainer,
  propsGridRow
}) {
  // Memoize `childItems`
  // `childItems` is an array of elements to render, each having width `childWidth`
  const childItemArr = useMemo(
    () => new ReshapeMatrix(childItems),
    [childItems]
  )

  // State for grid contents (column containers)
  const [rowContainersArr, setRowContainersArr] = useState([])

  // Function that fills up grid container with elements
  // `childItemArr` is the element matrix
  const fillupRowContainers = () => {
    let rowContainersArr = []
    for (let row = 0; row < childItemArr.maxRows; row++) {
      rowContainersArr.push(
        <motion.div
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
        </motion.div>
      )
    }
    setRowContainersArr(rowContainersArr)
  }

  // Function to handle columns container resize event
  // Reshapes the matrix
  const handleGridContainerResize = ({ height }) => {
    childItemArr.reshapeWithRows(Math.floor(height / childHeight))
    fillupRowContainers()
  }

  // Render
  return (
    <ReactResizeObserver onResize={handleGridContainerResize}>
      <AnimatePresence {...propsAnimatePresence}>
        <AnimateSharedLayout type='crossfade'>
          <motion.div
            className='waterfall-horizontal-grid-animated-container'
            layout
            style={{
              display: 'flex',
              flexDirection: 'column',
              ...styleGridContainer
            }}
            {...propsGridContainer}
          >
            {rowContainersArr}
          </motion.div>
        </AnimateSharedLayout>
      </AnimatePresence>
    </ReactResizeObserver>
  )
}
