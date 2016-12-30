import { CIPPage } from './app.po';

describe('cip App', function() {
  let page: CIPPage;

  beforeEach(() => {
    page = new CIPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
