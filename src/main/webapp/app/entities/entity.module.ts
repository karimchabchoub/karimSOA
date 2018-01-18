import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SoaEtudiantModule } from './etudiant/etudiant.module';
import { SoaEnseignantModule } from './enseignant/enseignant.module';
import { SoaSectionModule } from './section/section.module';
import { SoaNoteModule } from './note/note.module';
import { SoaMatiereModule } from './matiere/matiere.module';
import { SoaDemandeAttestationModule } from './demande-attestation/demande-attestation.module';
import { SoaAbsencesModule } from './absences/absences.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SoaEtudiantModule,
        SoaEnseignantModule,
        SoaSectionModule,
        SoaNoteModule,
        SoaMatiereModule,
        SoaDemandeAttestationModule,
        SoaAbsencesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoaEntityModule {}
