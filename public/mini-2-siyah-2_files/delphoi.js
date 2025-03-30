var _delphoiUrl,
  _caq = _caq || {},
  _gcol = _gcol || {
    unUsedParameters: ['rootUrl'],
    rootUrl: _caq.rootUrl,
    channel: _caq.channel,
  };
try {
  _delphoiUrl = document
    .getElementById('delphoi-script')
    .getAttribute('data-append-url');
} catch (e) {
  (_delphoiUrl = ''), console.warn(e);
}
(_gcol.ReadCookie = function (e) {
  for (
    var n = e + '=', r = document.cookie.split(';'), o = 0;
    o < r.length;
    o++
  ) {
    for (var t = r[o]; ' ' === t.charAt(0); ) t = t.substring(1, t.length);
    if (0 === t.indexOf(n)) return t.substring(n.length, t.length);
  }
  return null;
}),
  (_gcol.GetPid = function () {
    var e = _gcol.ReadCookie('pid');
    return null === e && (e = _gcol.ReadCookie('pid_alt')), { pid: e };
  }),
  (_gcol.GetSid = function () {
    return { sid: _gcol.ReadCookie('sid') };
  }),
  (_gcol.HasSidAndPid = function () {
    return !!_gcol.GetPid().pid && !!_gcol.GetSid().sid;
  }),
  (_gcol.AppendPixel = function (e) {
    var n =
        _delphoiUrl +
        '/__gc.gif?_=' +
        Math.random().toString().slice(12) +
        '&p=' +
        this.RemoveAndEncodeParameters(e),
      r = document.createElement('img');
    (r.src = n),
      (r.id = Math.random() + '_pixel'),
      (r.style.display = 'none'),
      document.body.insertBefore(r, document.body.firstChild),
      document.body.removeChild(r);
  }),
  (_gcol.HasWebBeaconSupport = function () {
    return !!navigator && !!navigator.sendBeacon;
  }),
  (_gcol.SendWebBeacon = function (e, n) {
    var r = _delphoiUrl + '/e',
      o = _gcol.GetBeaconData(e, n);
    return (
      navigator.sendBeacon(
        r,
        new Blob([JSON.stringify(o)], { type: 'text/plain; charset=UTF-8' })
      ) || _gcol.AppendPixel(e)
    );
  }),
  (_gcol.Send = function (e, n) {
    return _gcol.HasWebBeaconSupport() && _gcol.HasSidAndPid()
      ? _gcol.SendWebBeacon(e, n)
      : _gcol.AppendPixel(e);
  }),
  (_gcol.Fire = function (e, n, r) {
    if ('string' != typeof e) throw new Error('missing event name parameter');
    if (n) return (n.channel = _gcol.channel), (n.event = e), _gcol.Send(n, r);
  }),
  (_gcol.RemoveAndEncodeParameters = function (e, n) {
    var r = this,
      o = r.getBrowserInformation();
    (e.ref = r.getReferrer()),
      n &&
        n.includeAdditionalData &&
        ((e.operatingSystem = o.os),
        (e.bv = o.bv),
        (e.bn = o.bn),
        (e.screenResolution = r.getResolution()));
    for (var t = e, i = r.unUsedParameters.length, a = 0; a < i; a++)
      delete t[r.unUsedParameters[a]];
    for (var a in t) (null !== t[a] && void 0 !== t[a]) || delete t[a];
    return encodeURIComponent(_gcol.psv(t));
  }),
  (_gcol.GetBeaconData = function (e, n) {
    var r = this,
      o = r.getBrowserInformation();
    (e.ref = r.getReferrer()),
      (e.pid = _gcol.GetPid().pid),
      (e.sid = _gcol.GetSid().sid),
      (e.sr = 'beacon'),
      n &&
        n.includeAdditionalData &&
        ((e.operatingSystem = o.os),
        (e.bv = o.bv),
        (e.bn = o.bn),
        (e.screenResolution = r.getResolution()));
    for (var t = e, i = r.unUsedParameters.length, a = 0; a < i; a++)
      delete t[r.unUsedParameters[a]];
    return t;
  }),
  (_gcol.escape = function (e) {
    if ('string' == typeof e) return e.replace(/\|/g, '\\|');
  }),
  (_gcol.psv = function (e) {
    var n = [];
    for (var r in e) n.push(r), n.push(_gcol.escape(e[r]));
    return n.join('||');
  }),
  (_gcol.getResolution = function () {
    return window.screen.availWidth + 'x' + window.screen.availHeight;
  }),
  (_gcol.getReferrer = function () {
    var e = document.referrer,
      n = document.location.host;
    return e.indexOf(n) < 0 ? document.referrer : '';
  }),
  (_gcol.getBrowserInformation = function () {
    navigator.appVersion;
    var e,
      n,
      r,
      o = navigator.userAgent,
      t = navigator.appName,
      i = '' + parseFloat(navigator.appVersion),
      a = parseInt(navigator.appVersion, 10);
    -1 != (n = o.indexOf('Opera'))
      ? ((t = 'Opera'),
        (i = o.substring(n + 6)),
        -1 != (n = o.indexOf('Version')) && (i = o.substring(n + 8)))
      : -1 != (n = o.indexOf('MSIE'))
      ? ((t = 'Microsoft Internet Explorer'), (i = o.substring(n + 5)))
      : -1 != (n = o.indexOf('Chrome'))
      ? ((t = 'Chrome'), (i = o.substring(n + 7)))
      : -1 != (n = o.indexOf('Safari'))
      ? ((t = 'Safari'),
        (i = o.substring(n + 7)),
        -1 != (n = o.indexOf('Version')) && (i = o.substring(n + 8)))
      : -1 != (n = o.indexOf('Firefox'))
      ? ((t = 'Firefox'), (i = o.substring(n + 8)))
      : (e = o.lastIndexOf(' ') + 1) < (n = o.lastIndexOf('/')) &&
        ((t = o.substring(e, n)),
        (i = o.substring(n + 1)),
        t.toLowerCase() == t.toUpperCase() && (t = navigator.appName)),
      -1 != (r = i.indexOf(';')) && (i = i.substring(0, r)),
      -1 != (r = i.indexOf(' ')) && (i = i.substring(0, r)),
      (a = parseInt('' + i, 10)),
      isNaN(a) &&
        ((i = '' + parseFloat(navigator.appVersion)),
        (a = parseInt(navigator.appVersion, 10)));
    var s = 'Unknown OS';
    return (
      -1 != navigator.appVersion.indexOf('Win') && (s = 'Windows'),
      -1 != navigator.appVersion.indexOf('Mac') && (s = 'MacOS'),
      -1 != navigator.appVersion.indexOf('X11') && (s = 'UNIX'),
      -1 != navigator.appVersion.indexOf('Linux') && (s = 'Linux'),
      { os: s, bv: i, bn: t }
    );
  }),
  'undefined' != typeof module && module.exports && (exports._gcol = _gcol);
