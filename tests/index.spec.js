'use strict'

// var $ = require('nd-jquery')
var chai = require('chai')
var sinonChai = require('sinon-chai')
var Plugins = require('../index')

var expect = chai.expect
// var sinon = window.sinon

chai.use(sinonChai)

/*globals describe,it*/

describe('Plugins', function() {

  it('Plugins', function() {
    expect(Plugins).to.be.a('object')
  })

})
