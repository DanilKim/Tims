import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated, config } from "@react-spring/web";
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';


const MENU_ITEMS = {
  'Building': ['bd1', 'bd2', 'bd3'], 
  'Box': ['box1, box2, box3, box4, box5'], 
  'Background': ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6'], 
  'Avatar': ['av1', 'av2', 'av3', 'av4'], 
  'Monster': ['ms1', 'ms2', 'ms3'], 
  'Object': []
};

const MAIN_BTN_ROTATION_ANGLE = 45;
const SEPARATION_Y_DISTANCE = 70;
const SEPARATION_X_DISTANCE = 80;
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
    config: {
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
          bottom: SEPARATION_Y_DISTANCE * (props.root + 1) ,
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
    reverse: !props.open,
    delay: computeDelay(props.index),
    config: {
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
        <IconButton onClick={openMenu}>
              <AddCircleIcon sx={{ fontSize: 45, color: 'white' }}/>
        </IconButton>
      </animated.div>
    </>
  );

}


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

  const onClickMenu = (index) => {
    setCur(index);
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
          bottom: '3%',
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
          onClick={onClickMenu} 
          current={index === currMenu} 
          subList={MENU_ITEMS[item]}
        />
      ))}
      <IconButton onClick={openMenu}>
        <animated.div ref={mainRef} style={animOpen}>
            <AddCircleIcon sx={{ fontSize: 55, color: 'hotpink' }}/>
        </animated.div>
      </IconButton>
    </Box>
  );
}
