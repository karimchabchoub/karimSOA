import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EnseignantComponent } from './enseignant.component';
import { EnseignantDetailComponent } from './enseignant-detail.component';
import { EnseignantPopupComponent } from './enseignant-dialog.component';
import { EnseignantDeletePopupComponent } from './enseignant-delete-dialog.component';

export const enseignantRoute: Routes = [
    {
        path: 'enseignant',
        component: EnseignantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignants'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enseignant/:id',
        component: EnseignantDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enseignantPopupRoute: Routes = [
    {
        path: 'enseignant-new',
        component: EnseignantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enseignant/:id/edit',
        component: EnseignantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enseignant/:id/delete',
        component: EnseignantDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
