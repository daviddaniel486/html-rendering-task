const path = require('path');
const fs = require('fs');
const http = require('http');
const { readFile } = require('fs/promises');

// creating a server
const server = http.createServer((request, response) => {
  let filePath = path.join(
    __dirname,
    'html',
    request.url === '/' || '/home' ? 'index.html' : request.url
  );
  let contentType = getContentType(filePath) || 'text / html';
  let emptyPage = path.join(__dirname, 'html', '404.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENDENT') {
        fs.readFile(emptyPage, 'utf8', (err, data) => {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(data);
        });
      } else {
        response.writeHead(500);
        response.end('A server error has occured');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(data);
    }
  });
});
const getContentType = (filePath) => {
  let extname = path.extname(filePath);
  if (extname == '.js ') {
    return 'text/javascript';
  }
  if (extname == '.css') {
    return 'text/css';
  }
  if (extname == '.png') {
    return 'image/png';
  }
  if (extname == 'jpg') {
    return 'image/jpg';
  }
};
const port = 5000;
server.listen(port, 'localhost', () => {
  console.log(`Server is running on port ${port}`);
});
