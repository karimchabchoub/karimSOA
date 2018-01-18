/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SoaTestModule } from '../../../test.module';
import { EtudiantComponent } from '../../../../../../main/webapp/app/entities/etudiant/etudiant.component';
import { EtudiantService } from '../../../../../../main/webapp/app/entities/etudiant/etudiant.service';
import { Etudiant } from '../../../../../../main/webapp/app/entities/etudiant/etudiant.model';

describe('Component Tests', () => {

    describe('Etudiant Management Component', () => {
        let comp: EtudiantComponent;
        let fixture: ComponentFixture<EtudiantComponent>;
        let service: EtudiantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [EtudiantComponent],
                providers: [
                    EtudiantService
                ]
            })
            .overrideTemplate(EtudiantComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtudiantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtudiantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Etudiant(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.etudiants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
