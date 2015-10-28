/*
 * Paralax Hover
 */
(function () {

  var config = {
    scale:    0.04, // Scale modifier
    rotation: 0.2,  // Rotation modifier, larger number = less rotation
    alpha:    0.2   // Alpha channel modifer
  }

  var imagesList = document.querySelectorAll('.ph-image');
  var imagesArray = Array.prototype.slice.call(imagesList);
  var imageWidth, imageHeight, imageShadow, imageLighting;

  if (imagesArray.length <= 0) {
    return;
  }

  /*
   * TODO: This could get seriously gnarly with too many images on screen
   * Would be better to defer these to a single listener on a wrapping element.
   */
  imagesArray.forEach(function (image) {
    image.addEventListener('mouseenter', handleMouseEnter);
    image.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);
  });

  function handleMouseEnter (e) {
    imageWidth = this.offsetWidth || this.clientWidth || this.scrollWidth;
    imageHeight = this.offsetHeight || this.clientHeight || this.scrollheight;

    // TODO: Give these a unique ID for better selection later
    imageShadow = this.querySelector('.ph-shadow')
    imageLighting = this.querySelector('.ph-lighting')

    this.style.width = (imageWidth + (imageWidth * config.scale)) + 'px';
    this.style.height = (imageHeight + (imageHeight * config.scale)) + 'px';
    this.style.transform = 'perspective('+ imageWidth * 3 + 'px)';
  }

  function handleMouseMove (e) {
    var bounds    = e.target.getBoundingClientRect();
    var centerX   = imageWidth / 2;
    var centerY   = imageHeight / 2;
    var deltaX    = e.offsetX - centerX;
    var deltaY    = e.offsetY - centerY;
    var rotateX   = deltaX / (config.rotation * 100);
    var rotateY   = deltaY / (config.rotation * 100);
    var angleRad  = Math.atan2(deltaY, deltaX);
    var angleDeg  = angleRad * 180 / Math.PI - 90;

    var gradientAmnt = (e.offsetY / bounds.top) * config.alpha;

    if (angleDeg <= 0) {
      angleDeg = angleDeg + 360;
    }

    console.log(
      ' centerX:',  centerX,  '\n',
      'centerY:',   centerY,  '\n',
      'deltaX:',    deltaX,   '\n',
      'deltaY:',    deltaY,   '\n',
      'rotateX:',   rotateX,  '\n',
      'rotateY:',   rotateY,  '\n',
      'arad:',      angleRad, '\n',
      'angle:',     angleDeg, '\n',
      'gradient:',  gradientAmnt, '\n',
      'bounds:',    bounds
    );

    // Rotate the image
    this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

    // Rotate the lighting layer
    // TODO: Make the alpha dynamic. Possibly how close the mouse is to the center of the image?
    imageLighting.style.background = '\
      linear-gradient(' + angleDeg + 'deg, rgba(255,255,255, ' + gradientAmnt + ') 0%, rgba(255,255,255,0) 60%)';

    imageLighting.style.transform = '\
      translateX(' + (centerX / imageWidth) / 2 + 'px) \
      translateY(' + (centerY / imageHeight) / 2 + 'px)';

  }

  function handleMouseLeave (e) {
    this.style.width = imageWidth + 'px';
    this.style.height = imageHeight + 'px';

    // Reset positions and rotations
    // TODO: Make this suck less and pull some of this stuff from the CSS file.
    this.style.transform = 'rotateX(0deg) rotateY(0deg)';
    imageLighting.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, .1) 0%, rgba(255, 255, 255, 0) 33%)'
    imageLighting.style.transform = 'translateX(0px) translateY(0px)';
  }

})();
