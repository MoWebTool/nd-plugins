/**
 * @module: nd-pluggable
 * @author: crossjs <liwenfu@crossjs.com> - 2015-02-09 17:28:21
 */

'use strict';

var PluginBase = function(name, starter) {
  this.name = name;
  this.starter = starter;
};

PluginBase.prototype.ready = function() {
  if (this.callback) {
    this.callback.call(this.host, this);
  }
};

PluginBase.prototype.start = function(host, callback) {
  if (host) {
    this.host = host;
  }

  if (callback) {
    this.callback = callback;
  }

  this.plugin = this.starter(host);

  if (!host.plugins) {
    host.plugins = {};
  }

  host.plugins[this.name] = this.plugin;
};

module.exports = {

  addPlugin: function(name, starter, callback) {
    if (!this._plugins) {
      this._plugins = {};
    }

    this.__plugins[name] = new PluginBase(name, starter).start(this, callback).plugin;
  },

  getPlugin: function(name) {
    return this.__plugins[name];
  }

};
