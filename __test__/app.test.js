import { handleSubmit } from '../src/client/js/app';

describe('Testing the handleSubmit function', () => {
  test('handleSubmit function should be defined', () => {
    expect(handleSubmit).toBeDefined();
  });

  test('handleSubmit should be a function', () => {
    expect(typeof handleSubmit).toBe('function');
  });


});
