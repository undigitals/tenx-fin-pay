/* eslint-disable */
var searchParams = new URLSearchParams(window.location.hash.slice(1));

export function startChat(token, language) {
  console.log('*-- StartChat function called from zenDeskChat.js --*');
  zE('messenger', 'loginUser', function (callback) {
    callback(token);
    zE('messenger:set', 'locale', language);
    zE('messenger', 'open');
  });
}
export function reLogin(token) {
  console.log('*-- Relogin function called from zenDeskChat.js --*');
  zE('messenger', 'loginUser', function (callback) {
    callback(token);
  });
}

export function isOpened(token) {
  console.log('*-- isOpened function called from zenDeskChat.js --*');
  zE('messenger:on', 'open', () => reLogin(token));
}

function setMessengerLocale(e) {
  zE('messenger:set', 'locale', e);
}
function createSnippetScript(e) {
  var t = window.location.host || 'static.zdassets.com',
    a = document.createElement('script');
  return (a.id = 'ze-snippet'), (a.src = 'https://' + t + '/ekr/snippet.js?key=' + e), a;
}
function createInstructionsElement(e, t, a) {
  var s = document.createTextNode(e),
    n = document.createElement('div');
  return n.classList.add('instructions'), n.setAttribute('dir', t), n.setAttribute('lang', a), n.appendChild(s), n;
}
function openWidget() {
  zE('messenger', 'open');
}
function showCustomLauncherButton() {
  var e = searchParams.get('customLauncherOpen'),
    t = document.createTextNode(e),
    a = document.createElement('button');
  return a.classList.add('faux_garden_button'), a.appendChild(t), a.addEventListener('click', openWidget), a;
}
function clearConversationHistory() {
  const e = ['clientId', 'appUserId', 'sessionToken'];
  Object.keys(localStorage)
    .filter((t) => e.includes(((e) => e.split('.')[1])(t)))
    .forEach((e) => localStorage.removeItem(e));
}
function optIntoUncachedConfigEndpoint() {
  window.zESettings = {
    ...window.zESettings,
    preview: !0,
  };
}
window.addEventListener('DOMContentLoaded', () => {
  if ((clearConversationHistory(), optIntoUncachedConfigEndpoint())) {
    const e = createSnippetScript('e3e5cbcc-2521-4174-a041-3c55a404776c');
    searchParams.has('locale') && e.addEventListener('load', () => setMessengerLocale(searchParams.get('locale'))), document.body.appendChild(e);
  }
  if (
    (searchParams.has('instructions') &&
      searchParams.has('dir') &&
      searchParams.has('locale') &&
      document.body.appendChild(createInstructionsElement(searchParams.get('instructions'), searchParams.get('dir'), searchParams.get('locale'))),
    'true' === searchParams.get('hasCustomLauncher'))
  ) {
    var e = showCustomLauncherButton();
    document.body.appendChild(e);
  }
  searchParams.has('title') && (document.title = searchParams.get('title')),
    searchParams.has('dir') && document.documentElement.setAttribute('dir', searchParams.get('dir')),
    searchParams.has('locale') && document.documentElement.setAttribute('lang', searchParams.get('locale'));
});
