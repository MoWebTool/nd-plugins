/**
 * @module: nd-plugins
 * @author: crossjs <liwenfu@crossjs.com> - 2015-02-09 17:28:21
 */

'use strict';

var Events = require('nd-events');

/**
 * @constructor
 * @param {string}    name      插件名称，宿主内唯一
 * @param {function}  starter   插件启动器
 */
var PluginBase = function(name, starter) {
  this.name = name;
  this.starter = starter;
};

/**
 * 绑定事件
 */
PluginBase.prototype._bind = function(events) {
  var key;

  for (key in events) {
    if (events.hasOwnProperty(key)) {
      this.on(key, events[key]);
    }
  }
};

// PluginBase.prototype.destroy = function() {
  // this.trigger('destroy');
// };

/**
 * 异步调用
 */
PluginBase.prototype.async = function() {
  this._async = true;
};

/**
 * 供 starter 调用，一般在插件就绪时调用
 */
PluginBase.prototype.ready = function() {
  this.trigger('ready');
};

/**
 * 启动插件
 * @param  {object}   host      宿主
 * @param  {function} callbacks   插件就绪回调函数，上下文为 host，传递参数为 plugin
 */
PluginBase.prototype.start = function(callbacks) {
  if (this._async) {
    this.starter();
    return;
  }

  if (callbacks) {

    if (typeof callbacks === 'function') {
      callbacks = {
        ready: callbacks
      };
    }

    this._bind(callbacks);
  }

  if (this.trigger('start') !== false) {
    if (!this._async) {
      this.starter();
    }
  }
};

Events.mixTo(PluginBase);

module.exports = {

  /**
   * 添加插件并自动执行
   * @param {string}   name       插件名称
   * @param {function} starter    插件启动器
   * @param {function} callbacks  插件回调
   */
  addPlugin: function(name, starter, callbacks) {
    var plugin = new PluginBase(name, starter);

    if (!this._plugins) {
      this._plugins = {};
    }

    this._plugins[name] = plugin;

    plugin.host = this;
    plugin.start(callbacks);
  },

  /**
   * 根据插件名称获取插件实例
   * @param  {string}   name    插件名称
   * @return {object}           插件实例
   */
  getPlugin: function(name) {
    return this._plugins && this._plugins[name];
  }

};
