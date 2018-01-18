import { BaseEntity } from './../../shared';

export class DemandeAttestation implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public lastname?: string,
        public cause?: string,
        public signerPar?: BaseEntity,
    ) {
    }
}
