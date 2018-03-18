const fs = require('fs');

module.exports = function(app) {
  fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !==0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    let name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app);
  });
};
