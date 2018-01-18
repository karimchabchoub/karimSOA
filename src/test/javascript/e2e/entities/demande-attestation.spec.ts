import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DemandeAttestation e2e test', () => {

    let navBarPage: NavBarPage;
    let demandeAttestationDialogPage: DemandeAttestationDialogPage;
    let demandeAttestationComponentsPage: DemandeAttestationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DemandeAttestations', () => {
        navBarPage.goToEntity('demande-attestation');
        demandeAttestationComponentsPage = new DemandeAttestationComponentsPage();
        expect(demandeAttestationComponentsPage.getTitle())
            .toMatch(/Demande Attestations/);

    });

    it('should load create DemandeAttestation dialog', () => {
        demandeAttestationComponentsPage.clickOnCreateButton();
        demandeAttestationDialogPage = new DemandeAttestationDialogPage();
        expect(demandeAttestationDialogPage.getModalTitle())
            .toMatch(/Create or edit a Demande Attestation/);
        demandeAttestationDialogPage.close();
    });

    it('should create and save DemandeAttestations', () => {
        demandeAttestationComponentsPage.clickOnCreateButton();
        demandeAttestationDialogPage.setNameInput('name');
        expect(demandeAttestationDialogPage.getNameInput()).toMatch('name');
        demandeAttestationDialogPage.setLastnameInput('lastname');
        expect(demandeAttestationDialogPage.getLastnameInput()).toMatch('lastname');
        demandeAttestationDialogPage.setCauseInput('cause');
        expect(demandeAttestationDialogPage.getCauseInput()).toMatch('cause');
        demandeAttestationDialogPage.signerParSelectLastOption();
        demandeAttestationDialogPage.save();
        expect(demandeAttestationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DemandeAttestationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-demande-attestation div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class DemandeAttestationDialogPage {
    modalTitle = element(by.css('h4#myDemandeAttestationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    lastnameInput = element(by.css('input#field_lastname'));
    causeInput = element(by.css('input#field_cause'));
    signerParSelect = element(by.css('select#field_signerPar'));

    getModalTitle() {
        return this.modalTitle.getText();
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

    setCauseInput = function(cause) {
        this.causeInput.sendKeys(cause);
    }

    getCauseInput = function() {
        return this.causeInput.getAttribute('value');
    }

    signerParSelectLastOption = function() {
        this.signerParSelect.all(by.tagName('option')).last().click();
    }

    signerParSelectOption = function(option) {
        this.signerParSelect.sendKeys(option);
    }

    getSignerParSelect = function() {
        return this.signerParSelect;
    }

    getSignerParSelectedOption = function() {
        return this.signerParSelect.element(by.css('option:checked')).getText();
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
