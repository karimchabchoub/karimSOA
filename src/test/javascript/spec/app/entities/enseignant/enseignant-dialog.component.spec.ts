/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SoaTestModule } from '../../../test.module';
import { EnseignantDialogComponent } from '../../../../../../main/webapp/app/entities/enseignant/enseignant-dialog.component';
import { EnseignantService } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.service';
import { Enseignant } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.model';

describe('Component Tests', () => {

    describe('Enseignant Management Dialog Component', () => {
        let comp: EnseignantDialogComponent;
        let fixture: ComponentFixture<EnseignantDialogComponent>;
        let service: EnseignantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [EnseignantDialogComponent],
                providers: [
                    EnseignantService
                ]
            })
            .overrideTemplate(EnseignantDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnseignantDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnseignantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enseignant(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.enseignant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enseignantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enseignant();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.enseignant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enseignantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
