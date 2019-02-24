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

const Modal = posed.div({
  enter: {
    y: -250,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    delay: 0,
    transition: { duration: 150 }
  }
});

const SmallModal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    delay: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1 } }
});



export {AnimatedWrapper, FromTheSide, Modal, Shade, SmallModal};
