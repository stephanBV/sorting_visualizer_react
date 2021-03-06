import React from 'react';
import store from '../store'

//############ START SLIDER & RESET BTN DESIGN  ########
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
    padding: 0,
  },
  margin: {
    height: theme.spacing(1),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = withStyles({ 
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: 0,
    marginRight: 10,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
//############ END SLIDER & RESET BTN DESIGN  ########
export default function InputArraySlider(props) {
  const classes = useStyles();
    // create inital slider value (0) and a function to update it
  const [_, setSliderValue] = React.useState(0);

  //handleSliderChange gets the value from the slider
  const handleSliderChange = (event, newValue) => {
    const lever = 1;
    const pumpedValue = newValue * lever;
    if (pumpedValue > 0) {
      setSliderValue(pumpedValue); //updates the previous value of the slider
      // create a liste of random number with length of newValue
      const newArray = [...Array(pumpedValue)].map(_=>Math.ceil(Math.random()*400));
      // dispatch the new list: update the store with our new list
      store.dispatch({
        type: 'SET_LIST',
        payload: newArray
      })
    };
  };

  return (
    <div className={classes.root} >
      <div className={classes.margin}/>
      <Typography gutterBottom>Change the size of the chart</Typography>
      <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={1} min={1} max={300} onChange={handleSliderChange}/>
    </div>
  );
}
