/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SoaTestModule } from '../../../test.module';
import { DemandeAttestationComponent } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.component';
import { DemandeAttestationService } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.service';
import { DemandeAttestation } from '../../../../../../main/webapp/app/entities/demande-attestation/demande-attestation.model';

describe('Component Tests', () => {

    describe('DemandeAttestation Management Component', () => {
        let comp: DemandeAttestationComponent;
        let fixture: ComponentFixture<DemandeAttestationComponent>;
        let service: DemandeAttestationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [DemandeAttestationComponent],
                providers: [
                    DemandeAttestationService
                ]
            })
            .overrideTemplate(DemandeAttestationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemandeAttestationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemandeAttestationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DemandeAttestation(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.demandeAttestations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
