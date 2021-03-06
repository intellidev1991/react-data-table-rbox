'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var DotsVerticalIcon = function DotsVerticalIcon(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === undefined ? 'currentColor' : _ref$color,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 24 : _ref$size,
      children = _ref.children,
      props = objectWithoutProperties(_ref, ['color', 'size', 'children']);

  var className = 'mdi-icon ' + (props.className || '');

  return React.createElement(
    'svg',
    _extends({}, props, { className: className, width: size, height: size, fill: color, viewBox: '0 0 24 24' }),
    React.createElement('path', { d: 'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z' })
  );
};

var DotsVerticalIcon$1 = React.memo ? React.memo(DotsVerticalIcon) : DotsVerticalIcon;

module.exports = DotsVerticalIcon$1;
