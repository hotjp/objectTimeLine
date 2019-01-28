'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 自动保存对象历史的工具类
 * 0.0.1
 */

(function (root, Library) {
  if (typeof define == 'function' && _typeof(define['amd']) == 'object' && define['amd']) {
    define(['exports'], Library);
  } else {
    Library = Library((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports || (root['TimeLine'] = {
      'noConflict': function (original) {
        function noConflict() {
          root['TimeLine'] = original;
          delete Library.noConflict;
          return Library;
        }
        return noConflict;
      }(root['TimeLine'])
    }));
  }
})(undefined, function (exports) {
  // ...


  function isSame(oldObj, newObj) {
    if (JSON.stringify(oldObj) === JSON.stringify(newObj)) {
      return true;
    }
    return true;
  }
  // function addOnBeforeUnload(e) {
  //   var ev = e || event;
  //   ev && (ev.returnValue = '确定要离开？');
  // }
  function noop() {}
  function makeTimeLine(opt) {
    this.options = {};
    this.timeLine = [(0, _util.extend)({}, opt.treasures)];
    options._treasures = opt.treasures;
    this.options = (0, _util.extend)({}, options, opt);
    this.options._initTime = +new Date();
    this.setBackup(true);
    if (this.options.backupOpt.autoBackup) {
      this.initBackup();
    }
    this.snapshoot = (0, _util.throttle)(this.snapshoot, this.options.timeLineOpt.throttleInterval);
  }
  var options = {
    // 实例时间
    _initTime: 0,
    // 来源对象,请勿传参
    _treasures: null,
    // 时间线
    timeLineOpt: {
      // 历史记录最大值
      maxLength: 3,
      // 历史记录保存节流间隔
      throttleInterval: 1e2,
      // 是否去重
      uniq: true
    },
    // 自动备份，默认保存在storage里，用的时候记得合并进正常数据避免丢失原型
    backupOpt: {
      // 初始值name
      _initKey: '',
      // 最新值name
      _backupKey: '',
      // 没有自定义则由’backup'+_initTime命名
      name: '',
      // 是否自动备份
      autoBackup: true,
      // 自动备份间隔
      backupInterval: 5 * 60 * 1e3,
      // backupInterval: 5 * 60,
      // 备份行为有则发送深拷贝的对象,没有则丢进locastorage
      setBackupAction: null,
      getBackupAction: null,
      // 备份回调，默认不输出信息
      backupCallback: noop
    },
    // 备份对象的初值
    treasures: null
  };

  var TimeLine = function () {
    _createClass(TimeLine, [{
      key: 'initBackup',
      value: function initBackup() {
        var that = this;
        this.backupTimer = setTimeout(function () {
          that.setBackup();
        }, this.options.backupOpt.backupInterval);
      }
    }, {
      key: 'setBackup',
      value: function setBackup(isInit) {
        var opt = this.options;
        var key = opt.backupOpt.name ? opt.backupOpt.name : 'backup';
        if (isInit) {
          key += 'Init';
        }
        var name = key + opt._initTime,
            item = this.timeLine[this.timeLine.length - 1];
        if (isInit) {
          item = this.options.treasures;
          opt.backupOpt._initKey = name;
        } else {
          opt.backupOpt._backupKey = name;
        }
        if ('function' == typeof opt.backupOpt.setBackupAction) {
          opt.backupOpt.backupAction(name, item);
        } else {
          localStorage.setItem(name, JSON.stringify(item));
        }
        this.initBackup();
        opt.backupOpt.backupCallback();
      }
    }, {
      key: 'getBackup',
      value: function getBackup(isInit) {
        var opt = this.options;
        var name = isInit ? opt.backupOpt._initKey : opt.backupOpt._backupKey;
        if ('function' == typeof opt.backupOpt.getBackupAction) {
          opt.backupOpt.backupAction(name);
        } else {
          return localStorage.getItem(name);
        }
      }
    }, {
      key: 'snapshoot',
      value: function snapshoot(obj) {
        // 去重
        if (this.options.timeLine.uniq && isSame(this.timeLine[this.timeLine.length - 1], obj)) {
          return;
        }

        // 长度控制
        if (this.timeLine.length >= this.options.timeLineOpt.maxLength) {
          this.timeLine = this.timeLine.splice(0, 1 + this.timeLine.length - this.options.timeLineOpt.maxLength);
        }
        // 增加
        this.timeLine.push((0, _util.extend)({}, obj));
      }
    }]);

    function TimeLine(opt) {
      _classCallCheck(this, TimeLine);

      makeTimeLine.call(this, opt);
      if (this.options.backupOpt.autoBackup) {
        this.clearBackup = function () {
          localStorage.removeItem(this.options.backupOpt._initKey);
          localStorage.removeItem(this.options.backupOpt._backupKey);
        };

        // 退出提示，自己实现，不放在主要功能里
        // if (window.attachEvent) {
        //   window.attachEvent('onbeforeunload', addOnBeforeUnload);
        // } else {
        //   window.addEventListener('beforeunload', addOnBeforeUnload, false);
        // }
      }
    }

    return TimeLine;
  }();

  return TimeLine;
});