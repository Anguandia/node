import {truth, power} from './general.js';

describe('testing nothing functions with jest', () => {
  it('compare true and true', () => {
    const resp = truth();
    expect(resp).toEqual(true);
  })
})

describe('test power function', () => {
  let res;
  it('should raise a positive number to a positive power', () => {
    res = power(5, 3);
    expect(res).toEqual(125);
  })
  it('should work for negative exponents', () => {
    res = power(2, -3);
    expect(res).toBe(0.125);
  })
  it('should work for power 0', () => {
    res = power(2, 0);
    expect(res).toEqual(1)
  })
  it('should work for base 0', () => {
    res = power(0, 100);
    expect(res).toEqual(0)
  })
  it('should work for base 0, exponent 0', () => {
    res = power(0, 0);
    expect(res).toEqual(1)
  })
})
