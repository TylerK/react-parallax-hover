let transition = 'all 0.3s ease-out';
let layersBase = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};

export default {

  phOutter: () => ({
    transformStyle: 'preserve-3d'
  }),

  phWrapper: () => ({
    position: 'relative',
    transition: transition,
    margin: 0,
    padding: 0
  }),

  phShadow: () => Object.assign({}, layersBase, {
    height: '90%',
    width: '90%',
    left: '5%',
    top: '5%',
    background: 'none',
    transition: transition
  }),

  phLayers: () => Object.assign({}, layersBase, {

  }),

  phLayer: () => Object.assign({}, layersBase, {

  }),

  phLighting: () => Object.assign({}, layersBase, {
    backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 33%)'
  }),

  phText: () => Object.assign({}, layersBase, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '5rem',
    color: '#ffffff'
  })
};

