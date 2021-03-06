# React Waterfall Grid

![npm](https://img.shields.io/npm/dm/react-waterfall-grid) ![Lines of code](https://img.shields.io/tokei/lines/github/captain-woof/react-waterfall-grid) ![NPM](https://img.shields.io/npm/l/react-waterfall-grid?color=orange) ![npm](https://img.shields.io/npm/v/react-waterfall-grid?color=yellow)

<p align="center">
  <img width="640" height="320" src="https://drive.google.com/uc?export=download&id=1k5jX04Czge3iGzHzasiT5SfHvX08CP8W">
</p>


### Table of Contents 📝
- **[Introduction](#introduction-)**
- **[Installing](#installing-)**
- **[Quick Example](#quick-example-)**
- **[All Grids](#all-grids-)**
- **[Props](#props-)**
- **[FAQ](#faq-)**
- **[Author](#author-)**

### Introduction 💡

https://user-images.githubusercontent.com/72122026/131544680-03955981-227c-4320-9a7f-5297b3d3fa31.mp4

**[React Waterfall Grid](https://www.npmjs.com/package/react-waterfall-grid)** is a library of fully responsive and customizable waterfall grids (vertical and horizontal). **All it needs is an array of your elements, and it handles the rest out-of-the-box.**

**At its core, `react-waterfall-grid` uses flexbox to place items correctly.** So, all the possible props that you can pass to the Grid components [(see 'All Grids')](#all-grids-) are the same as what you would pass to flexbox. The below [example](#usage-example-) will show you how it's done.

See this for a **[live demo](https://sohail-saha.in/react-waterfall-grid/).**

### Installing ⏳

`npm install --save react-waterfall-grid`

...and you're good to go!

### Quick Example 🏎

Here's a small example to get you started.
**Take note** of how the array of (one-dimensional) elements is passed to the grid through a prop. Yes, you pass all your stuff only once!

```js
import styled from 'styled-components'
import {WaterfallGrid} from 'react-waterfall-grid'
import { useMediaQuery } from 'react-responsive'

// You are free to add as many grid contents as you want. Here, you see only 4 pictures.
import Image1 from './static/images/1.jpg'
import Image2 from './static/images/2.jpg'
import Image3 from './static/images/3.jpg'
import Image4 from './static/images/4.jpg'

const ParentContainer = styled.div`
  width: 100%;
  background-color: #121212;
`

const Image = styled.img`
  object-fit: cover;
`

export default function App() {
  // Boolean - True if phone
  const isPhone = useMediaQuery({ query: 'max-width: 480px' })

  // List of images <img>
  const imagesList = [Image1, Image2, Image3, Image4].map((imagePath) => (
    <Image key={imagePath} style={{ width: (isPhone ? "200px" : "300px") }} src={imagePath} alt={imagePath}
      variants={imageVariants} whileHover={{ scale: 1.05, transition: { ease: ease, duration: 0.8 } }} />
  ))

  return (
    <ParentContainer id="parent-container">
      <WaterfallGrid children={imagesList} childWidth={isPhone ? 200 : 300}
        styleGridContainer={{ width: "100%", position: "relative", justifyContent: "center", zIndex: 1 }}/>
    </ParentContainer>
  );
}
```

### All Grids 🔭

With `react-waterfall-grid`, you get access to two different grid containers - 
- **`WaterfallGrid`**
- **`WaterfallHorizontalGrid`**

As you might have guessed, `WaterfallGrid` is named so because the child contents *fall vertically*, while in `WaterfallHorizontalGrid` the child contents *'fall' horizontally.*

The **vertical grid will only accept child elements with a fixed width** but any height. (to keep the elements' layout changes constrained), whereas the **horizontal grid will only accept child elements with a fixed height** but any width.

Based on this, **there are different props, some common to both Grids, and the rest are specific to a particular type of Grid.** *[Read the next section](#props-)* to get a list of props and the grids they can be used on.

Lastly, **`react-waterfall-grid` uses flexbox at its core**, so to customize styles for the grid container as a whole or the grid columns (or rows, for horizontal grids), **pass in the style with the appropriate prop just like you would for a native flexbox container.**

### Props 😏

#### **children**

*Supported by both grids*

A one-directional array of containing all child elements. Make sure to give them unique keys. Any customization you want on the child must be done by you, the grid won't handle that, allowing full control on each child element as well.

`children` can be a state as well, and updating this state will cause the Grid to re-render appropriately on its own, meaning, that you do not need to take care of the re-rendering yourself!

#### **styleGridContainer**

*Supported by both grids*

Takes an object, just like `style` on native React elements. Allows customization of the entire grid container. Use flexbox stylings.

#### **styleGridColumn**

*Supported by `WaterfallGrid`*

Takes an object, just like `style` on native React elements. Allows customization of each grid column. Use flexbox stylings.

#### **styleGridRow**

*Supported by `WaterfallHorizontalGrid`*

Takes an object, just like `style` on native React elements. Allows customization of each grid row. Use flexbox stylings.

#### **childWidth**

*Supported by `WaterfallGrid`*

The width of each child element in the grid. **Must be a number** (would be used as pixels); *cannot be a string*. **This will remain constant.** The height is freely allowed to change.

#### **childHeight**

*Supported by `WaterfallHorizontalGrid`*

The height of each child element in the grid. **Must be a number** (would be used as pixels); *cannot be a string*. **This will remain constant.** The width is freely allowed to change.

#### **propsGridContainer**

*Supported by both grids*

Props to pass to the grid container (flexbox `div`).

#### **propsGridColumn**

*Supported by `WaterfallGrid`*

Props to pass to each grid column (flexbox `div`).

#### **propsGridRow**

*Supported by `WaterfallHorizontalGrid`*

Props to pass to each grid column (flexbox `div`).

### FAQ 🤔

- **Sometimes, on some grid container sizes, one of the columns (or rows) get bigger than the rest. Why's that?**

    *That is because the grid **does not judge and reshape itself based on the child heights (for vertical grids) or widths (for horizontal grids).** It rather checks the total number of elements and the parent element dimensions to judge how many elements can be fitted per column/row. **If it so happens that a few of the child elements are much larger than all remaining child elements, you'll see this happening.**
    I'll be working on it soon, I have some ideas.*

- **What happened to the Animated grids?**

    *Well, I found out that you do not need motion divs (from Framer Motion) to allow animated child components inside, and to allow animated layout changes. So, I did away with it. This reduced the peer dependencies as well, allowing projects to use `react-waterfall-grid` without adding framer-motion even if they do not have any animated components.*
    
- **I found an issue/bug, where do I tell you about it?**

    *[Raise an issue](https://github.com/captain-woof/react-waterfall-grid/issues), or [start a Discussion](https://github.com/captain-woof/react-waterfall-grid/discussions) and let's discuss about it.*
    
- **Am I free to use it in my project?**

    *Why not? **This package is MIT licensed**. Do anything you wish to with it, with one condition that you come back and tell me about it.*
    
### Author

**[Sohail Saha (aka CaptainWoof)](https://sohail-saha.in)**

[![Buy me a coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=captainwoof&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/captainwoof)

*Please consider supporting me if you find this package useful in your work.*
