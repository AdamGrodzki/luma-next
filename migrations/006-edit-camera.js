module.exports = function (migration) {
  const camera = migration.editContentType('camera');

  camera
    .createField('shortDescription')
    .name('Short Description')
    .type('Text');

  camera
    .createField('story')
    .name('Story')
    .type('Text');

  camera
    .createField('launchPrice')
    .name('Launch Price')
    .type('Symbol');

  camera
    .createField('weight')
    .name('Weight')
    .type('Integer');

  camera
    .createField('dimensions')
    .name('Dimensions')
    .type('Symbol');

  camera
    .createField('weatherSealed')
    .name('Weather Sealed')
    .type('Boolean');

  camera
    .createField('maxResolution')
    .name('Max Resolution')
    .type('Symbol');

  camera
    .createField('isoRange')
    .name('ISO Range')
    .type('Symbol');

  camera
    .createField('continuousShooting')
    .name('Continuous Shooting')
    .type('Symbol');

  camera
    .createField('imageProcessor')
    .name('Image Processor')
    .type('Symbol');

  camera
    .createField('videoSpecs')
    .name('Video Specs')
    .type('Symbol');

  camera
    .createField('micPort')
    .name('Mic Port')
    .type('Boolean');

  camera
    .createField('headphonePort')
    .name('Headphone Port')
    .type('Boolean');

  camera
    .createField('screenSpecs')
    .name('Screen Specs')
    .type('Symbol');

  camera
    .createField('touchscreen')
    .name('Touchscreen')
    .type('Boolean');

  camera
    .createField('wireless')
    .name('Wireless')
    .type('Symbol');

  camera
    .createField('storageTypes')
    .name('Storage Types')
    .type('Symbol');

  camera
    .createField('popularityScore')
    .name('Popularity Score')
    .type('Integer');

  camera
    .createField('popularityLabel')
    .name('Popularity Label')
    .type('Symbol');

  camera
    .createField('marketPriceMin')
    .name('Market Price Min')
    .type('Integer');

  camera
    .createField('marketPriceAvg')
    .name('Market Price Avg')
    .type('Integer');

  camera
    .createField('marketPriceMax')
    .name('Market Price Max')
    .type('Integer');

  camera
    .createField('recommendedLenses')
    .name('Recommended Lenses')
    .type('Array')
    .items({
      type: 'Symbol',
    });
};