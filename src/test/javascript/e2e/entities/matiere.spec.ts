import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Matiere e2e test', () => {

    let navBarPage: NavBarPage;
    let matiereDialogPage: MatiereDialogPage;
    let matiereComponentsPage: MatiereComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Matieres', () => {
        navBarPage.goToEntity('matiere');
        matiereComponentsPage = new MatiereComponentsPage();
        expect(matiereComponentsPage.getTitle())
            .toMatch(/Matieres/);

    });

    it('should load create Matiere dialog', () => {
        matiereComponentsPage.clickOnCreateButton();
        matiereDialogPage = new MatiereDialogPage();
        expect(matiereDialogPage.getModalTitle())
            .toMatch(/Create or edit a Matiere/);
        matiereDialogPage.close();
    });

    it('should create and save Matieres', () => {
        matiereComponentsPage.clickOnCreateButton();
        matiereDialogPage.setNameInput('name');
        expect(matiereDialogPage.getNameInput()).toMatch('name');
        matiereDialogPage.setCoeffInput('5');
        expect(matiereDialogPage.getCoeffInput()).toMatch('5');
        matiereDialogPage.enseignantSelectLastOption();
        matiereDialogPage.sectionSelectLastOption();
        matiereDialogPage.save();
        expect(matiereDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MatiereComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-matiere div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class MatiereDialogPage {
    modalTitle = element(by.css('h4#myMatiereLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    coeffInput = element(by.css('input#field_coeff'));
    enseignantSelect = element(by.css('select#field_enseignant'));
    sectionSelect = element(by.css('select#field_section'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setCoeffInput = function(coeff) {
        this.coeffInput.sendKeys(coeff);
    }

    getCoeffInput = function() {
        return this.coeffInput.getAttribute('value');
    }

    enseignantSelectLastOption = function() {
        this.enseignantSelect.all(by.tagName('option')).last().click();
    }

    enseignantSelectOption = function(option) {
        this.enseignantSelect.sendKeys(option);
    }

    getEnseignantSelect = function() {
        return this.enseignantSelect;
    }

    getEnseignantSelectedOption = function() {
        return this.enseignantSelect.element(by.css('option:checked')).getText();
    }

    sectionSelectLastOption = function() {
        this.sectionSelect.all(by.tagName('option')).last().click();
    }

    sectionSelectOption = function(option) {
        this.sectionSelect.sendKeys(option);
    }

    getSectionSelect = function() {
        return this.sectionSelect;
    }

    getSectionSelectedOption = function() {
        return this.sectionSelect.element(by.css('option:checked')).getText();
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
