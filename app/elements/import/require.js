function getName() {
  var error = new Error();
  var stack = error.stack.trim().split('\n').map(function(line){
    var result = /.*\/(.*?).js:/g.exec(line);
    if(result)
      return result[1];
  }).filter(function(name){
    return name;
  });
  stack = stack.filter(function(name){
    return name !== stack[0];
  });
  return stack[0].replace('.lib', '');
}

var definedScripts = {};

var define = function(val){
  definedScripts[getName()] = typeof val === 'function' ? val() : val;
};

var require = function(name){
  return definedScripts[name];
};
