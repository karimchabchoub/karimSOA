import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Note e2e test', () => {

    let navBarPage: NavBarPage;
    let noteDialogPage: NoteDialogPage;
    let noteComponentsPage: NoteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Notes', () => {
        navBarPage.goToEntity('note');
        noteComponentsPage = new NoteComponentsPage();
        expect(noteComponentsPage.getTitle())
            .toMatch(/Notes/);

    });

    it('should load create Note dialog', () => {
        noteComponentsPage.clickOnCreateButton();
        noteDialogPage = new NoteDialogPage();
        expect(noteDialogPage.getModalTitle())
            .toMatch(/Create or edit a Note/);
        noteDialogPage.close();
    });

    it('should create and save Notes', () => {
        noteComponentsPage.clickOnCreateButton();
        noteDialogPage.setNoteInput('5');
        expect(noteDialogPage.getNoteInput()).toMatch('5');
        noteDialogPage.etudiantSelectLastOption();
        noteDialogPage.matiereSelectLastOption();
        noteDialogPage.save();
        expect(noteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NoteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-note div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class NoteDialogPage {
    modalTitle = element(by.css('h4#myNoteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    noteInput = element(by.css('input#field_note'));
    etudiantSelect = element(by.css('select#field_etudiant'));
    matiereSelect = element(by.css('select#field_matiere'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNoteInput = function(note) {
        this.noteInput.sendKeys(note);
    }

    getNoteInput = function() {
        return this.noteInput.getAttribute('value');
    }

    etudiantSelectLastOption = function() {
        this.etudiantSelect.all(by.tagName('option')).last().click();
    }

    etudiantSelectOption = function(option) {
        this.etudiantSelect.sendKeys(option);
    }

    getEtudiantSelect = function() {
        return this.etudiantSelect;
    }

    getEtudiantSelectedOption = function() {
        return this.etudiantSelect.element(by.css('option:checked')).getText();
    }

    matiereSelectLastOption = function() {
        this.matiereSelect.all(by.tagName('option')).last().click();
    }

    matiereSelectOption = function(option) {
        this.matiereSelect.sendKeys(option);
    }

    getMatiereSelect = function() {
        return this.matiereSelect;
    }

    getMatiereSelectedOption = function() {
        return this.matiereSelect.element(by.css('option:checked')).getText();
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
