/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SoaTestModule } from '../../../test.module';
import { DemandeAttestationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation-delete-dialog.component';
import { DemandeAttestationService } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.service';

describe('Component Tests', () => {

    describe('DemandeAttestation Management Delete Component', () => {
        let comp: DemandeAttestationDeleteDialogComponent;
        let fixture: ComponentFixture<DemandeAttestationDeleteDialogComponent>;
        let service: DemandeAttestationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [DemandeAttestationDeleteDialogComponent],
                providers: [
                    DemandeAttestationService
                ]
            })
            .overrideTemplate(DemandeAttestationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemandeAttestationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemandeAttestationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
