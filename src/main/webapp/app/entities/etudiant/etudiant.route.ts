import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EtudiantComponent } from './etudiant.component';
import { EtudiantDetailComponent } from './etudiant-detail.component';
import { EtudiantPopupComponent } from './etudiant-dialog.component';
import { EtudiantDeletePopupComponent } from './etudiant-delete-dialog.component';

export const etudiantRoute: Routes = [
    {
        path: 'etudiant',
        component: EtudiantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etudiants'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'etudiant/:id',
        component: EtudiantDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etudiants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etudiantPopupRoute: Routes = [
    {
        path: 'etudiant-new',
        component: EtudiantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etudiants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etudiant/:id/edit',
        component: EtudiantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etudiants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etudiant/:id/delete',
        component: EtudiantDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etudiants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
