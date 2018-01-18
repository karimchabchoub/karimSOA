/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SoaTestModule } from '../../../test.module';
import { EtudiantDetailComponent } from '../../../../../../main/webapp/app/entities/etudiant/etudiant-detail.component';
import { EtudiantService } from '../../../../../../main/webapp/app/entities/etudiant/etudiant.service';
import { Etudiant } from '../../../../../../main/webapp/app/entities/etudiant/etudiant.model';

describe('Component Tests', () => {

    describe('Etudiant Management Detail Component', () => {
        let comp: EtudiantDetailComponent;
        let fixture: ComponentFixture<EtudiantDetailComponent>;
        let service: EtudiantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [EtudiantDetailComponent],
                providers: [
                    EtudiantService
                ]
            })
            .overrideTemplate(EtudiantDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtudiantDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtudiantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Etudiant(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.etudiant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
