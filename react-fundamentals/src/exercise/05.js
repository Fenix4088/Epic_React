// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react';
import '../box-styles.css';

// 🐨 add a className prop to each div and apply the correct class names
// based on the text content
// 💰 Here are the available class names: box, box--large, box--medium, box--small
// 💰 each of the elements should have the "box" className applied

// 🐨 add a style prop to each div so their background color
// matches what the text says it should be
// 🐨 also use the style prop to make the font italic
// 💰 Here are available style attributes: backgroundColor, fontStyle

// ! 5
// const smallBox = <div className={'box box--small'} style={{fontStyle: 'italic', backgroundColor: 'lightblue'}}>small lightblue box</div>;
// const mediumBox = <div className={'box box--medium'} style={{fontStyle: 'italic', backgroundColor: 'pink'}}>medium pink box</div>;
// const largeBox = <div className={'box box--large'} style={{fontStyle: 'italic', backgroundColor: 'orange'}}>large orange box</div>;

// ! 5.1
// const Box = ({className, style, children}) => {
//   return (
//     <div className={`box ${className ?? ''}`} style={{fontStyle: 'italic', ...style}}>
//       {children}
//     </div>
//   );
// };

// ! 5.2
const Box = ({size = '', style, children}) => {
  return (
    <div className={`box box--${size ?? ''}`} style={{fontStyle: 'italic', ...style}}>
      {children}
    </div>
  );
};

function App() {
  return (
    <div>
      {/*{smallBox}*/}
      {/*{mediumBox}*/}
      {/*{largeBox}*/}

      {/*<Box className={'box--small'} style={{background: 'lightblue'}}>small lightblue box</Box>*/}
      {/*<Box className={'box--medium'} style={{background: 'pink'}}>medium pink box</Box>*/}
      {/*<Box className={'box--large'} style={{background: 'orange'}}>large orange box</Box>*/}

      <Box size={'small'} style={{background: 'lightblue'}}>small lightblue box</Box>
      <Box size={'medium'} style={{background: 'pink'}}>medium pink box</Box>
      <Box size={'large'} style={{background: 'orange'}}>large orange box</Box>
    </div>
  );
}

export default App;
