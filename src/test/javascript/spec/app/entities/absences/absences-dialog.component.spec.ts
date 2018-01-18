/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SoaTestModule } from '../../../test.module';
import { AbsencesDialogComponent } from '../../../../../../main/webapp/app/entities/absences/absences-dialog.component';
import { AbsencesService } from '../../../../../../main/webapp/app/entities/absences/absences.service';
import { Absences } from '../../../../../../main/webapp/app/entities/absences/absences.model';
import { EtudiantService } from '../../../../../../main/webapp/app/entities/etudiant';
import { MatiereService } from '../../../../../../main/webapp/app/entities/matiere';

describe('Component Tests', () => {

    describe('Absences Management Dialog Component', () => {
        let comp: AbsencesDialogComponent;
        let fixture: ComponentFixture<AbsencesDialogComponent>;
        let service: AbsencesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [AbsencesDialogComponent],
                providers: [
                    EtudiantService,
                    MatiereService,
                    AbsencesService
                ]
            })
            .overrideTemplate(AbsencesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbsencesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbsencesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Absences(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.absences = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'absencesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Absences();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.absences = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'absencesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
