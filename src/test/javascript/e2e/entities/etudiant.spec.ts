import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Etudiant e2e test', () => {

    let navBarPage: NavBarPage;
    let etudiantDialogPage: EtudiantDialogPage;
    let etudiantComponentsPage: EtudiantComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Etudiants', () => {
        navBarPage.goToEntity('etudiant');
        etudiantComponentsPage = new EtudiantComponentsPage();
        expect(etudiantComponentsPage.getTitle())
            .toMatch(/Etudiants/);

    });

    it('should load create Etudiant dialog', () => {
        etudiantComponentsPage.clickOnCreateButton();
        etudiantDialogPage = new EtudiantDialogPage();
        expect(etudiantDialogPage.getModalTitle())
            .toMatch(/Create or edit a Etudiant/);
        etudiantDialogPage.close();
    });

    it('should create and save Etudiants', () => {
        etudiantComponentsPage.clickOnCreateButton();
        etudiantDialogPage.setCinInput('5');
        expect(etudiantDialogPage.getCinInput()).toMatch('5');
        etudiantDialogPage.setNameInput('name');
        expect(etudiantDialogPage.getNameInput()).toMatch('name');
        etudiantDialogPage.setLastnameInput('lastname');
        expect(etudiantDialogPage.getLastnameInput()).toMatch('lastname');
        etudiantDialogPage.setEmailInput('email');
        expect(etudiantDialogPage.getEmailInput()).toMatch('email');
        etudiantDialogPage.setDnInput('2000-12-31');
        expect(etudiantDialogPage.getDnInput()).toMatch('2000-12-31');
        etudiantDialogPage.setSexeInput('sexe');
        expect(etudiantDialogPage.getSexeInput()).toMatch('sexe');
        etudiantDialogPage.setMoyenneInput('moyenne');
        expect(etudiantDialogPage.getMoyenneInput()).toMatch('moyenne');
        etudiantDialogPage.etudierSelectLastOption();
        etudiantDialogPage.save();
        expect(etudiantDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EtudiantComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-etudiant div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EtudiantDialogPage {
    modalTitle = element(by.css('h4#myEtudiantLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cinInput = element(by.css('input#field_cin'));
    nameInput = element(by.css('input#field_name'));
    lastnameInput = element(by.css('input#field_lastname'));
    emailInput = element(by.css('input#field_email'));
    dnInput = element(by.css('input#field_dn'));
    sexeInput = element(by.css('input#field_sexe'));
    moyenneInput = element(by.css('input#field_moyenne'));
    etudierSelect = element(by.css('select#field_etudier'));

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

    setMoyenneInput = function(moyenne) {
        this.moyenneInput.sendKeys(moyenne);
    }

    getMoyenneInput = function() {
        return this.moyenneInput.getAttribute('value');
    }

    etudierSelectLastOption = function() {
        this.etudierSelect.all(by.tagName('option')).last().click();
    }

    etudierSelectOption = function(option) {
        this.etudierSelect.sendKeys(option);
    }

    getEtudierSelect = function() {
        return this.etudierSelect;
    }

    getEtudierSelectedOption = function() {
        return this.etudierSelect.element(by.css('option:checked')).getText();
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
