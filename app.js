/*!
*              __     _
*   _    _/__  /./|,//_`
*  /_//_// /_|///  //_, app.js
*
* Copyright (c) 2012 outaTiME, Inc.
*/

var
  connect = require('connect'),
  app = connect.createServer();

app.use(connect.compress());
// app.use(connect.staticCache());
app.use(connect.static(__dirname + '/public', { maxAge: 86400000 }));

app.listen(process.env.PORT || 3001, function () {
  console.log("Listening on port %d", this.address().port);
});
