module.exports = function(u, d){
  var n  = u + d;
  if(n == 0){
    return 0;
  }
  var z = 1.281551565545;
  var p = u / n;
  var left = p + 1/(2*n)*z*z;
  var right = z*Math.sqrt(p*(1-p)/n + z*z/(4*n*n));
  var under = 1+1/n*z*z;

  return (left - right) / under;
};
