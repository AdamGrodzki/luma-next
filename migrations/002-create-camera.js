module.exports = function (migration) {
  const camera = migration.createContentType('camera', {
    name: 'Camera',
    description: 'Camera model',
    displayField: 'name',
  });

  camera.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true);

  camera.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  camera.createField('brand')
    .name('Brand')
    .type('Link')
    .linkType('Entry')
    .required(true)
    .validations([{ linkContentType: ['brand'] }]);

  camera.createField('releaseYear')
    .name('Release year')
    .type('Integer');

  camera.createField('cameraType')
    .name('Camera type')
    .type('Symbol');

  camera.createField('mount')
    .name('Mount')
    .type('Symbol');

  camera.createField('sensorFormat')
    .name('Sensor format')
    .type('Symbol');

  camera.createField('description')
    .name('Description')
    .type('Text');

  camera.createField('specs')
    .name('Specs')
    .type('Object');

  camera.createField('status')
    .name('Status')
    .type('Symbol');

  camera.createField('legacyId')
    .name('Legacy ID')
    .type('Symbol');

  camera.createField('sourceUrl')
    .name('Source URL')
    .type('Symbol');
};