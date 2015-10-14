module.exports = function(url, type) {
  if (typeof self !== 'undefined' && typeof window === 'undefined') {
    return self.importScript(url);
  }

  if (!type) type = 'js';
  var head = document.head;
  var child;
  switch (type) {
    case 'js':
      child = document.createElement('script');
      child.setAttribute('type', 'text/javascript');
      child.setAttribute('src', url);
      break;
    case 'css':
      child = document.createElement('link');
      child.setAttribute('rel', 'stylesheet');
      child.setAttribute('href', url);
      break;
  }
  head.appendChild(child);
};
