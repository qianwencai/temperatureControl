module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'standard',//业界有一些流行的代码风格，比如Airbnb和Standard。使用它们的话，团队成员之间的代码会更易读。
  extends: ['airbnb-base'],//业界有一些流行的代码风格，比如Airbnb和Standard。使用它们的话，团队成员之间的代码会更易读。
  // required to lint *.vue files
  parser: 'babel-eslint',
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': ['error', {
      max: 2,
      maxEOF: 2,
      maxBOF: 2
    }],
    'space-before-function-paren':0,
    'semi':0,
    'no-new':0,
    'no-unused-vars':0,
    'no-undef':0,
    "no-tabs":"off",
    'indent':0,
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],//不要定义未使用的变量。
    // "comma-dangle": ["error", "always"]//允许多余的分号
    "no-alert": 0,
    "no-console": 0,
    'global-require': 0, //暂时离不开require
    'no-unused-expressions':0,//禁止出现未使用过的表达式
    'one-var':0,
    'one-var-declaration-per-line':0,//要求或禁止在变量声明周围换行
    'consistent-return':0,//要求 return 语句要么总是指定返回的值，要么不指定
    'no-multi-assign':0,//禁止连续赋值
    "import/no-unresolved": 0,
    "import/extensions": 0,

  }
}
