class PracticePage {
    constructor(page) {
      this.page = page;
      this.url = 'https://www.letskodeit.com/practice';
    }
  
    async navigate() {
      await this.page.goto(this.url);
    }
    async clickPracticeLink() {
      await this.practiceLink.click();
    }

  }
  
  module.exports = PracticePage;
  