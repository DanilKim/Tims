import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated, config, easings } from "@react-spring/web";
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ItemBtn from './itemBtn';


const MENU_ITEMS = {
  'Building': ['bd1', 'bd2', 'bd3'], 
  'Shape': ['box1', 'box2', 'box3', 'box4', 'box5'], 
  //'Background': ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6'], 
  'Avatar': ['av1', 'av2', 'av3', 'av4'], 
  //'Monster': ['ms1', 'ms2', 'ms3'], 
  'Wall': ['w1', 'w2', 'w3'], 
  'Door': ['d1', 'd2', 'd3', 'd4', 'd5'], 
  'Window': ['wd1', 'wd2', 'wd3', 'wd4'], 
};

const MAIN_BTN_ROTATION_ANGLE = 45;
const SEPARATION_Y_DISTANCE = 120;
const SEPARATION_X_DISTANCE = 150;
const DELAY = 25;


function finalChildPositions(index) {
  return SEPARATION_DISTANCE * index;
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function computeDelay(index) {
  return DELAY * index;
}

function AddSubItemBtn(props) {
  const subRef = useRef();
  const [isOpen, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(!isOpen);
    console.log(props.name + ' clicked!!');
  };

  const animOpen = useSpring({
    from: { translateX: 0, opacity: 0},
    to: { translateX: (props.index + 1) * SEPARATION_X_DISTANCE, opacity: !subRef.current ? 0 : 1},
    reverse: !props.open,
    delay: computeDelay(props.index),
    immediate: !subRef.current,
    config: !props.open ? {duration: 300, easing: easings.easeInOutQuart} : {
      mass: 1,
      tension: 180,
      friction: 12,
    },
  })


  return (
    <Box
      sx={{
        '& > :not(style)': {
          width: '50px', height: '50px',
          position: 'relative',
          bottom: SEPARATION_Y_DISTANCE * (props.root + 1) + 5,
        },
      }}
    >
      <animated.div ref={subRef} style={animOpen}>
        <IconButton onClick={openMenu}>
          <AddBoxIcon sx={{ fontSize: 55, color: 'yellow' }}/>
        </IconButton>
      </animated.div>
    </Box>
  );
}


function AddItemBtn(props) {
  const itemRef = useRef();
  const [isOpen, setOpen] = useState(false);

  const openMenu = () => {
    props.onClick(props.index);
    setOpen(!isOpen);
  };

  const animOpen = useSpring({
    from: { translateY: 0, opacity: 0},
    to: { translateY: -1 * (props.index + 1) * SEPARATION_Y_DISTANCE, opacity: !itemRef.current ? 0 : 1},
    immediate: !itemRef.current,
    reverse: !props.open,
    delay: computeDelay(props.index),
    config: !props.open ? {duration: 300, easing: easings.easeInOutQuart} : {
      mass: 1,
      tension: 180,
      friction: 12,
    },
  });

  useEffect( () => {
    if (!props.current) {
      setOpen(false);
    }
  }, [props.current])

  return (
    <>
      {props.subList.map((subMenu, index) => ( 
        <AddSubItemBtn
          key={subMenu}
          name={subMenu}
          index={index}
          root={props.index}
          open={isOpen}
        />
      ))}

      <animated.div ref={itemRef} style={animOpen}>
        <IconButton onClick={openMenu} size='small'>
          <ItemBtn name={props.name}/>
        </IconButton>
      </animated.div>
    </>
  );
  
}
//<AddCircleIcon sx={{ fontSize: 50, color: 'white' }}/>


export default function AddBtn() {
  const mainRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [currMenu, setCur] = useState(-1);

  const openMenu = () => {
    console.log('main btn clicked!');
    if (isOpen) {
      setCur(-1);
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const onClickMenu = (index, item) => {
    setCur(index);
    console.log(item + ' clicked!');
    console.log('elements : ' + MENU_ITEMS[item]);
  }

  const animOpen = useSpring({
    from: { rotate: 0 },
    to: { rotate: 45 },
    immediate: !mainRef.current,
    reverse: !isOpen,
    config: config.stiff,
  })

  return (
    <Box
      sx={{
        '& > :not(style)': {
          width: '50px', height: '50px',
          position: 'absolute',
          bottom: 'calc( 5% + 30px )',
          left: '1.5%'
        },
      }}
    >
      {Object.keys(MENU_ITEMS).map((item, index) => (
        <AddItemBtn
          key={item} 
          name={item} 
          index={index} 
          open={isOpen} 
          onClick={()=>{onClickMenu(index,item)}} 
          current={index === currMenu} 
          subList={MENU_ITEMS[item]}
        />
      ))}
      <animated.div ref={mainRef} style={animOpen}>
        <IconButton onClick={openMenu} sx={{ml:2}}>
            <AddCircleIcon sx={{fontSize: 80, color: 'hotpink' }}/>
        </IconButton>
      </animated.div>
    </Box>
  );
}
