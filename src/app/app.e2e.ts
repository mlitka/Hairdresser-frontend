describe('App', () => {

    beforeEach(() => {
        // change hash depending on router LocationStrategy
        browser.get('/');
    });


    it('should have a title', () => {
        let subject = browser.getTitle();
        let result = 'HAIR SALON';
        expect(subject).toEqual(result);
    });

    it('should have navbar-title', () => {
        let subject = element(by.id('navbar-title')).getText();
        let result = 'HAIR SALON';
        expect(subject).toEqual(result);
    });

    it('should have list of navbar links', () => {
        let navs = element.all(by.tagName('li')).count();
        let result = 8;
        expect(navs).toEqual(result);
    });

    
});
