import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Absences e2e test', () => {

    let navBarPage: NavBarPage;
    let absencesDialogPage: AbsencesDialogPage;
    let absencesComponentsPage: AbsencesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Absences', () => {
        navBarPage.goToEntity('absences');
        absencesComponentsPage = new AbsencesComponentsPage();
        expect(absencesComponentsPage.getTitle())
            .toMatch(/Absences/);

    });

    it('should load create Absences dialog', () => {
        absencesComponentsPage.clickOnCreateButton();
        absencesDialogPage = new AbsencesDialogPage();
        expect(absencesDialogPage.getModalTitle())
            .toMatch(/Create or edit a Absences/);
        absencesDialogPage.close();
    });

    it('should create and save Absences', () => {
        absencesComponentsPage.clickOnCreateButton();
        absencesDialogPage.setNbAbsencesInput('5');
        expect(absencesDialogPage.getNbAbsencesInput()).toMatch('5');
        absencesDialogPage.possedeSelectLastOption();
        absencesDialogPage.associerSelectLastOption();
        absencesDialogPage.save();
        expect(absencesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AbsencesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-absences div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AbsencesDialogPage {
    modalTitle = element(by.css('h4#myAbsencesLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nbAbsencesInput = element(by.css('input#field_nbAbsences'));
    possedeSelect = element(by.css('select#field_possede'));
    associerSelect = element(by.css('select#field_associer'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNbAbsencesInput = function(nbAbsences) {
        this.nbAbsencesInput.sendKeys(nbAbsences);
    }

    getNbAbsencesInput = function() {
        return this.nbAbsencesInput.getAttribute('value');
    }

    possedeSelectLastOption = function() {
        this.possedeSelect.all(by.tagName('option')).last().click();
    }

    possedeSelectOption = function(option) {
        this.possedeSelect.sendKeys(option);
    }

    getPossedeSelect = function() {
        return this.possedeSelect;
    }

    getPossedeSelectedOption = function() {
        return this.possedeSelect.element(by.css('option:checked')).getText();
    }

    associerSelectLastOption = function() {
        this.associerSelect.all(by.tagName('option')).last().click();
    }

    associerSelectOption = function(option) {
        this.associerSelect.sendKeys(option);
    }

    getAssocierSelect = function() {
        return this.associerSelect;
    }

    getAssocierSelectedOption = function() {
        return this.associerSelect.element(by.css('option:checked')).getText();
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
