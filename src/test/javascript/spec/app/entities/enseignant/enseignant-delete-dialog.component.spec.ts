/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SoaTestModule } from '../../../test.module';
import { EnseignantDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/enseignant/enseignant-delete-dialog.component';
import { EnseignantService } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.service';

describe('Component Tests', () => {

    describe('Enseignant Management Delete Component', () => {
        let comp: EnseignantDeleteDialogComponent;
        let fixture: ComponentFixture<EnseignantDeleteDialogComponent>;
        let service: EnseignantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [EnseignantDeleteDialogComponent],
                providers: [
                    EnseignantService
                ]
            })
            .overrideTemplate(EnseignantDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnseignantDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnseignantService);
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
