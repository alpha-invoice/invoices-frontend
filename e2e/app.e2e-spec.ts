import { PaysafeInternsInvoicesPage } from './app.po';

describe('paysafe-interns-invoices App', function() {
  let page: PaysafeInternsInvoicesPage;

  beforeEach(() => {
    page = new PaysafeInternsInvoicesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
