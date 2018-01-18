import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Section e2e test', () => {

    let navBarPage: NavBarPage;
    let sectionDialogPage: SectionDialogPage;
    let sectionComponentsPage: SectionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sections', () => {
        navBarPage.goToEntity('section');
        sectionComponentsPage = new SectionComponentsPage();
        expect(sectionComponentsPage.getTitle())
            .toMatch(/Sections/);

    });

    it('should load create Section dialog', () => {
        sectionComponentsPage.clickOnCreateButton();
        sectionDialogPage = new SectionDialogPage();
        expect(sectionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Section/);
        sectionDialogPage.close();
    });

    it('should create and save Sections', () => {
        sectionComponentsPage.clickOnCreateButton();
        sectionDialogPage.setNameInput('name');
        expect(sectionDialogPage.getNameInput()).toMatch('name');
        sectionDialogPage.save();
        expect(sectionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SectionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-section div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SectionDialogPage {
    modalTitle = element(by.css('h4#mySectionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
