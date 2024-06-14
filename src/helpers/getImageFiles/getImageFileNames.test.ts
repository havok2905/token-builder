import fs from 'fs';

import { getImageFileNames } from './getImageFileNames';

describe('getImageFileNames', () => {
  it('should fetch the image file names of a directory and omit all but white listed image types', () => {
    const fsMock = jest.spyOn(fs, 'readdirSync');

    fsMock.mockReturnValue([
      // @ts-ignore
      'testA.png',
      // @ts-ignore
      'testB.txt',
      // @ts-ignore
      'testC.jpg',
      // @ts-ignore
      'testD.txt',
      // @ts-ignore
      'testE.txt',
      // @ts-ignore
      'testF.jpeg',
      // @ts-ignore
      'testG.webp',
      // @ts-ignore
      'testH.txt'
    ]);

    const names = getImageFileNames('/');

    expect(names.length).toEqual(4);

    expect(names[0]).toEqual('testA.png');
    expect(names[1]).toEqual('testC.jpg');
    expect(names[2]).toEqual('testF.jpeg');
    expect(names[3]).toEqual('testG.webp');
  });
});
