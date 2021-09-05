/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'
import { WaterfallGrid } from 'react-waterfall-grid'
import { useMediaQuery } from 'react-responsive'
import { motion } from 'framer-motion'
import React from 'react'

import Image1 from './static/images/1.jpg'
import Image2 from './static/images/2.jpg'
import Image3 from './static/images/3.jpg'
import Image4 from './static/images/4.jpg'
import Image5 from './static/images/5.jpg'
import Image6 from './static/images/6.jpg'
import Image7 from './static/images/7.jpg'
import Image8 from './static/images/8.jpg'
import Image9 from './static/images/9.jpg'
import Image10 from './static/images/10.jpg'
import Image11 from './static/images/11.jpg'
import Image12 from './static/images/12.jpg'
import Image13 from './static/images/13.jpg'
import Image14 from './static/images/14.jpg'
import Image15 from './static/images/15.jpg'
import Image16 from './static/images/16.jpg'
import Image17 from './static/images/17.jpg'
import Image18 from './static/images/18.jpg'
import Image19 from './static/images/19.jpg'
import Image20 from './static/images/20.jpg'

const ParentContainer = styled.div`
  width: 100%;
  background-color: #121212;
`

const OverlayAndTitleContainer = styled.div`
  height: 100%;
  width: 100%;
  font-family: 'intellecta';
  color: #F7F7F7;
  background-color: #31313144;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 0;
  left: 0;
`

const Title = styled(motion.div)`
  font-size: 8vw;
  user-select: none;
  text-shadow: 4px 4px 2px #212121;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Code = styled(motion.div)`
  padding: 8px;
  font-size: 2.5vw;
  user-select: none;
  text-shadow: 2px 2px 1px #212121;
  box-shadow: 4px 4px 4px #212121;
  border-bottom: 2px solid #F3F3F3;
  border-right: 2px solid #F3F3F3;
  user-select: all;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const ease = [0.65, 0, 0.35, 1]

const getImageContainerVariants = () => ({
  initial: {
    opacity: 0,
    y: 120
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: ease,
      duration: 1.2,
      delay: Math.random() * 2
    }
  }
})

const titleContainerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const codeContainerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const characterVariantTitle = {
  initial: {
    y: 90,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: ease,
      duration: 0.7
    }
  }
}

const characterVariantCode = {
  initial: {
    opacity: 0,
    scale: 1.1
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "linear",
      duration: 0.1
    }
  }
}

export default function App() {
  // Boolean - True if phone
  const isPhone = useMediaQuery({ query: 'max-width: 480px' })

  // List of images <img>
  const imagesList = [Image6, Image7, Image8, Image9, Image10, Image11, Image12, Image13, Image14, Image15, Image16, Image17, Image18, Image19, Image20, Image4, Image1, Image2, Image3, Image5]
    .map((imagePath) => (
      <motion.div key={imagePath} style={{ width: (isPhone ? "200px" : "300px") }}
        variants={getImageContainerVariants()} animate="animate" initial="initial">
        <img src={imagePath} alt={imagePath} style={{ objectFit: "cover", height: "100%", width: "inherit" }} />
      </motion.div>
    ))

  return (
    <ParentContainer id="parent-container">
      <WaterfallGrid childItems={imagesList} childWidth={isPhone ? 200 : 300}
        styleGridContainer={{ width: "100%", position: "relative", justifyContent: "center", zIndex: 1 }} />
      <OverlayAndTitleContainer>
        <Title id="title" variants={titleContainerVariant} initial="initial" animate="animate" exit="exit">
          {"react-waterfall-grid".split("").map((character, index) => (
            <motion.div key={index} variants={characterVariantTitle}>{character}</motion.div>
          ))}
        </Title>
        <Code id="code" variants={codeContainerVariant} initial="initial" animate="animate" exit="exit">
          {"npm install --save react-waterfall-grid".split("").map((character, index) => (
            (character === ' '
              ? <motion.div key={index} variants={characterVariantCode}>&nbsp;</motion.div>
              : <motion.div key={index} variants={characterVariantCode}>{character}</motion.div>
            )
          ))}
        </Code>
      </OverlayAndTitleContainer>
    </ParentContainer>
  );
}
