import { ConfigClient } from './ConfigClient';
import dotenv from 'dotenv';

jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('ConfigClient', () => {
  const oldEnv = process.env;

  afterAll(() => {
    process.env = oldEnv;
  });

  describe('static', () => {
    describe('init', () => {
      it('should call config on dotenv', () => {
        ConfigClient.init();
        expect(dotenv.config).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('getConfig', () => {
      it('should construct a config from environment variables', () => {
        const TOKEN_IN_DIR = '/out';
        const TOKEN_OUT_DIR = '/out';
        process.env = { TOKEN_IN_DIR, TOKEN_OUT_DIR };
        const result = ConfigClient.getConfig();
        expect(result.tokenInDir).toBe(TOKEN_IN_DIR);
        expect(result.tokenOutDir).toBe(TOKEN_OUT_DIR);
      });

      it('should default not found values to empty string', () => {
        process.env = { };
        const result = ConfigClient.getConfig();
        expect(result.tokenInDir).toBe('');
        expect(result.tokenOutDir).toBe('');
      });
    });
  });
});
