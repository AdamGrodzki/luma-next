module.exports = function (migration) {
  const camera = migration.editContentType("camera");

  camera
    .createField("heroImage")
    .name("Hero image")
    .type("Link")
    .linkType("Asset");
};