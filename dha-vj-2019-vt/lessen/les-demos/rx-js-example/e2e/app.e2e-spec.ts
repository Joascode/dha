import { RxJsExamplePage } from './app.po';

describe('rx-js-example App', () => {
  let page: RxJsExamplePage;

  beforeEach(() => {
    page = new RxJsExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
