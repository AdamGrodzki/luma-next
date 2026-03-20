module.exports = function (migration) {
  const brand = migration.createContentType('brand', {
    name: 'Brand',
    description: 'Camera brand',
    displayField: 'name',
  });

  brand.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true);

  brand.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  brand.createField('country')
    .name('Country')
    .type('Symbol');

  brand.createField('foundedYear')
    .name('Founded year')
    .type('Integer');

  brand.createField('description')
    .name('Description')
    .type('Text');

  brand.createField('legacyId')
    .name('Legacy ID')
    .type('Symbol');

  brand.createField('sourceUrl')
    .name('Source URL')
    .type('Symbol');
};