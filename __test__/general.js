function truth() {
  return true;
}

function power (base, exp) {
  let res, final;
  if(exp == 0) res = 1;
  else res = base*power(base, Math.abs(exp) - 1);
  if (exp<0) final = 1/res;
  else final = res;
  return final;
}

export {truth, power}