'use strict';

const rules = ['clean', 'constants', 'html', 'copy'];

module.exports = rules.map((name) => require(`./${name}`));
