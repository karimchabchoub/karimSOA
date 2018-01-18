import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Enseignant e2e test', () => {

    let navBarPage: NavBarPage;
    let enseignantDialogPage: EnseignantDialogPage;
    let enseignantComponentsPage: EnseignantComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Enseignants', () => {
        navBarPage.goToEntity('enseignant');
        enseignantComponentsPage = new EnseignantComponentsPage();
        expect(enseignantComponentsPage.getTitle())
            .toMatch(/Enseignants/);

    });

    it('should load create Enseignant dialog', () => {
        enseignantComponentsPage.clickOnCreateButton();
        enseignantDialogPage = new EnseignantDialogPage();
        expect(enseignantDialogPage.getModalTitle())
            .toMatch(/Create or edit a Enseignant/);
        enseignantDialogPage.close();
    });

    it('should create and save Enseignants', () => {
        enseignantComponentsPage.clickOnCreateButton();
        enseignantDialogPage.setCinInput('5');
        expect(enseignantDialogPage.getCinInput()).toMatch('5');
        enseignantDialogPage.setNameInput('name');
        expect(enseignantDialogPage.getNameInput()).toMatch('name');
        enseignantDialogPage.setLastnameInput('lastname');
        expect(enseignantDialogPage.getLastnameInput()).toMatch('lastname');
        enseignantDialogPage.setEmailInput('email');
        expect(enseignantDialogPage.getEmailInput()).toMatch('email');
        enseignantDialogPage.setDnInput('2000-12-31');
        expect(enseignantDialogPage.getDnInput()).toMatch('2000-12-31');
        enseignantDialogPage.setSexeInput('sexe');
        expect(enseignantDialogPage.getSexeInput()).toMatch('sexe');
        enseignantDialogPage.save();
        expect(enseignantDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EnseignantComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-enseignant div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EnseignantDialogPage {
    modalTitle = element(by.css('h4#myEnseignantLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cinInput = element(by.css('input#field_cin'));
    nameInput = element(by.css('input#field_name'));
    lastnameInput = element(by.css('input#field_lastname'));
    emailInput = element(by.css('input#field_email'));
    dnInput = element(by.css('input#field_dn'));
    sexeInput = element(by.css('input#field_sexe'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setCinInput = function(cin) {
        this.cinInput.sendKeys(cin);
    }

    getCinInput = function() {
        return this.cinInput.getAttribute('value');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setLastnameInput = function(lastname) {
        this.lastnameInput.sendKeys(lastname);
    }

    getLastnameInput = function() {
        return this.lastnameInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setDnInput = function(dn) {
        this.dnInput.sendKeys(dn);
    }

    getDnInput = function() {
        return this.dnInput.getAttribute('value');
    }

    setSexeInput = function(sexe) {
        this.sexeInput.sendKeys(sexe);
    }

    getSexeInput = function() {
        return this.sexeInput.getAttribute('value');
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
