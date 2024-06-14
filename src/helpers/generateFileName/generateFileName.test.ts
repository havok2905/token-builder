import { generateFileName } from './generateFileName';

describe('generateFileName', () => {
  it('should make a file name', () => {
    expect(generateFileName('foo', '.png')).toEqual('foo-token.png');
  });
});