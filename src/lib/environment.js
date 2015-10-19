'use strict';

module.exports = function() {
  return {
    name: process.env.NODE_EVN ? process.env.NODE_EVN : 'production'
  };
};
