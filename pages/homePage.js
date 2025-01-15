class HomePage {
    constructor(page) {
      this.page = page;
      this.url = 'https://www.letskodeit.com/home';
      this.practiceLink = page.locator('a.dynamic-link.dropdown-toggle:text("PRACTICE")');
      this.elementPracticeLink = page.locator('role=link[name="Element Practice"]');
      this.pageTitle = page.locator('h1');
    }
  
    async navigate() {
      await this.page.goto(this.url);
    }
    async clickPracticeLink() {
      await this.practiceLink.click();
    }
  
    // async clickElementPracticeLink() {
    //   await this.clickPracticeLink();
    //   await this.elementPracticeLink.click();
    // }

    async clickElementPracticeLink() {
      await this.clickPracticeLink();
      
      const [newTab] = await Promise.all([
        this.page.context().waitForEvent('page'), // Wait for the new tab
        this.elementPracticeLink.click(),
      ]);
      
      await newTab.waitForLoadState('domcontentloaded');
  
      // Return the new tab object for further interaction
      return newTab;
    }

  
    async getPageTitle() {
      return await this.pageTitle.textContent();
    }
  
    async assertPageTitle(expectedTitle) {
      const title = await this.getPageTitle();
      if (title !== expectedTitle) {
        throw new Error(`Expected title to be "${expectedTitle}", but got "${title}"`);
      }
    }
  }
  
  module.exports = HomePage;
  