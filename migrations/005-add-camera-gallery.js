module.exports = function (migration) {
  const camera = migration.editContentType("camera");

  camera
    .createField("gallery")
    .name("Gallery")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Asset",
    });
};