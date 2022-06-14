import React, { useState, useRef } from 'react';
import { useSpring, animated, config } from "@react-spring/web";
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const SEPARATION_DISTANCE = 70;
const DELAY = 25;

function finalChildPositions(index) {
  return -1 * SEPARATION_DISTANCE * index;
}

function computeDelay(index) {
  return DELAY * index;
}

const MENU_ITEMS = ['Building', 'Box', 'Background', 'Avatar', 'Monster', 'Object'];


function AddItemBtn(props) {
  const ref = useRef();

  const animOpen = useSpring({
    from: { translateY: 0, opacity: 0},
    to: { translateY: finalChildPositions(props.index + 1), opacity: !ref.current ? 0 : 1},
    reverse: !props.open,
    delay: computeDelay(props.index),
    immediate: !ref.current,
    config: {
      mass: 1,
      tension: 180,
      friction: 12,
    },
  })

  //const animClose = useSpring({
  //  from: { translateY: finalChildPositions(props.index + 1)},
  //  to: { translateY: 0 },
  //  //reverse: !props.open,
  //  delay: computeDelay(props.index),
  //  config: {
  //    mass: 1,
  //    tension: 180,
  //    friction: 100,
  //  },
  //})

  //let anim = props.open ? animOpen : animClose;

  return (
    <IconButton onClick={()=>{console.log(props.name + ' button clicked!');}}>
      <animated.div ref={ref} style={animOpen}>
          <AddCircleIcon sx={{ fontSize: 40, color: 'white' }}/>
      </animated.div>
    </IconButton>
  );

}


export default function AddBtn() {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);

  const openMenu = () => {
    console.log('main btn clicked!');
    isOpen ? setOpen(false) : setOpen(true);
  }

  const animOpen = useSpring({
    from: { rotate: 0 },
    to: { rotate: 45 },
    immediate: !ref.current,
    reverse: !isOpen,
    config: config.stiff,
  })


  return (
    <Box
      sx={{
        '& > :not(style)': {
          width: '50px', height: '50px',
          position: 'absolute',
          bottom: '3%',
          left: '1.5%'
        },
      }}
    >
      {MENU_ITEMS.map((item, index) => (
        <AddItemBtn key={index} name={item} index={index} open={isOpen}/>
      ))}
      <IconButton onClick={openMenu}>
        <animated.div ref={ref} style={animOpen}>
            <AddCircleIcon sx={{ fontSize: 55, color: 'hotpink' }}/>
        </animated.div>
      </IconButton>
    </Box>
  );
}
