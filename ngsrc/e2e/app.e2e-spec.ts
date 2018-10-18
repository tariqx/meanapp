import { NgsrcPage } from './app.po';

describe('ngsrc App', function() {
  let page: NgsrcPage;

  beforeEach(() => {
    page = new NgsrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
