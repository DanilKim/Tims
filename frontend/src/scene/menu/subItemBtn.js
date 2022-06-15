import React, { useState } from 'react';
import {FaPlusCircle as IconAdd} from 'react-icons/fa';

const STYLE_BOX = {
  width: '6em',
  height: '6em',
  padding: '0.3em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '20px',
  transition: 'all .15s ease-in-out',
  WebkitTransition: 'all .15s ease-in-out',
  alignSelf: 'center',
  justifySelf: 'center'

};

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: '#F5FE6E'
};  

const STYLE_TITLE = {
  width:'100%',
  textAlign:'center',
  display:'block',
  marginBottom:'.1em',
  textTransform: 'capitalize'
};

const STYLE_TITLE_HOVER = {
  ...STYLE_TITLE,
  //color:'white'
};

const STYLE_IMAGE_CONTAINER = {
  width: '100%',
  height: '4em',
  position:'relative',
  overflow:'hidden',
  border: 'solid 1px #e6e6e6',
  borderRadius: '30px',
  padding:0,
  margin:0,
  marginBottom: '3px'  
}

const STYLE_IMAGE = {
  position:'absolute',
  background: '#222',
  width: '100%',
  height: '100%',
  backgroundSize: 'contain',
  backgroundPosition:'50% 50%',
  backgroundColor:'white',
  backgroundRepeat:'no-repeat',
  transition: 'all .2s ease-in-out'
};

const STYLE_PLUS_HOVER = {
  marginTop:'0.6em',
  color: '#F5FE6E',
  fontSize: '1.8em',
  opacity: '0.7',
  width: '100%'
};


export default function ItemBtn(props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={hover ? STYLE_BOX_HOVER : STYLE_BOX}
      onMouseEnter={(e) => {setHover(true)}}
      onMouseLeave={(e) => {setHover(false)}}
    >
      <div style={ STYLE_IMAGE_CONTAINER }>
        <div style={{...STYLE_IMAGE, backgroundImage: 'url(/icons/add/'+props.category+'/'+props.name+'.png)' }}>
          { hover ? <IconAdd style={STYLE_PLUS_HOVER} /> : null }
        </div>
      </div>
      <b style={ !hover ? STYLE_TITLE : STYLE_TITLE_HOVER }>{props.name}</b>
    </div>
  );
}