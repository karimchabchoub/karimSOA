/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SoaTestModule } from '../../../test.module';
import { DemandeAttestationDialogComponent } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation-dialog.component';
import { DemandeAttestationService } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.service';
import { DemandeAttestation } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.model';
import { EnseignantService } from '../../../../../../main/webapp/app/entities/enseignant';

describe('Component Tests', () => {

    describe('DemandeAttestation Management Dialog Component', () => {
        let comp: DemandeAttestationDialogComponent;
        let fixture: ComponentFixture<DemandeAttestationDialogComponent>;
        let service: DemandeAttestationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [DemandeAttestationDialogComponent],
                providers: [
                    EnseignantService,
                    DemandeAttestationService
                ]
            })
            .overrideTemplate(DemandeAttestationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemandeAttestationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemandeAttestationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DemandeAttestation(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.demandeAttestation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'demandeAttestationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DemandeAttestation();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.demandeAttestation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'demandeAttestationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
