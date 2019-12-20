H5P.externalDispatcher.on('xAPI', eventHandler);

H5P.externalDispatcher.on('xAPI', function (event) {
  console.log(event.data.statement);
});

H5P.externalDispatcher.on('xAPI', function (event) {
  if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
    console.log('do something useful here');
  }
});