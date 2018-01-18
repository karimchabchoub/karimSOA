/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SoaTestModule } from '../../../test.module';
import { DemandeAttestationDetailComponent } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation-detail.component';
import { DemandeAttestationService } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.service';
import { DemandeAttestation } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.model';

describe('Component Tests', () => {

    describe('DemandeAttestation Management Detail Component', () => {
        let comp: DemandeAttestationDetailComponent;
        let fixture: ComponentFixture<DemandeAttestationDetailComponent>;
        let service: DemandeAttestationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [DemandeAttestationDetailComponent],
                providers: [
                    DemandeAttestationService
                ]
            })
            .overrideTemplate(DemandeAttestationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemandeAttestationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemandeAttestationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DemandeAttestation(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.demandeAttestation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
