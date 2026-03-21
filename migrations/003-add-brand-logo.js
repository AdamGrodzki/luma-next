module.exports = function (migration) {
  const brand = migration.editContentType("brand");

  brand
    .createField("logo")
    .name("Logo")
    .type("Link")
    .linkType("Asset");
};