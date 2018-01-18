package com.soa.app.repository;

import com.soa.app.domain.DemandeAttestation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DemandeAttestation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemandeAttestationRepository extends JpaRepository<DemandeAttestation, Long> {

}
