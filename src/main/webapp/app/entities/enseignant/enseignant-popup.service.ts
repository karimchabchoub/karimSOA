import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Enseignant } from './enseignant.model';
import { EnseignantService } from './enseignant.service';

@Injectable()
export class EnseignantPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private enseignantService: EnseignantService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.enseignantService.find(id).subscribe((enseignant) => {
                    if (enseignant.dn) {
                        enseignant.dn = {
                            year: enseignant.dn.getFullYear(),
                            month: enseignant.dn.getMonth() + 1,
                            day: enseignant.dn.getDate()
                        };
                    }
                    this.ngbModalRef = this.enseignantModalRef(component, enseignant);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.enseignantModalRef(component, new Enseignant());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    enseignantModalRef(component: Component, enseignant: Enseignant): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.enseignant = enseignant;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
