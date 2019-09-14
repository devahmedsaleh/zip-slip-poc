const admZip = require('adm-zip');

module.exports = function extract(fileName, srcDir, targetDir) {
  let extracted = [];
  const zip = new admZip(srcDir + fileName);

  zip.getEntries().forEach(function (zipEntry) {
    extracted.push('\n' + zipEntry.entryName);
  });
  zip.extractAllTo(targetDir, true);

  return extracted;
};
