'use strict';

const rules = ['js', 'css', 'less', 'images', 'md', 'fonts'];

module.exports = rules.map((name) => require(`./${name}`));
