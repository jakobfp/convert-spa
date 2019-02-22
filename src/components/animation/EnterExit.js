import posed from 'react-pose';

const AnimatedWrapper = posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0}
});

const FromTheSide = posed.div({
  open: {y: '0%'},
  closed: {y: '-1000%'},
  transistion: {duration: 3000}
})



export {AnimatedWrapper, FromTheSide};
