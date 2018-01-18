package com.soa.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.soa.app.domain.DemandeAttestation;

import com.soa.app.repository.DemandeAttestationRepository;
import com.soa.app.web.rest.errors.BadRequestAlertException;
import com.soa.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DemandeAttestation.
 */
@RestController
@RequestMapping("/api")
public class DemandeAttestationResource {

    private final Logger log = LoggerFactory.getLogger(DemandeAttestationResource.class);

    private static final String ENTITY_NAME = "demandeAttestation";

    private final DemandeAttestationRepository demandeAttestationRepository;

    public DemandeAttestationResource(DemandeAttestationRepository demandeAttestationRepository) {
        this.demandeAttestationRepository = demandeAttestationRepository;
    }

    /**
     * POST  /demande-attestations : Create a new demandeAttestation.
     *
     * @param demandeAttestation the demandeAttestation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new demandeAttestation, or with status 400 (Bad Request) if the demandeAttestation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/demande-attestations")
    @Timed
    public ResponseEntity<DemandeAttestation> createDemandeAttestation(@RequestBody DemandeAttestation demandeAttestation) throws URISyntaxException {
        log.debug("REST request to save DemandeAttestation : {}", demandeAttestation);
        if (demandeAttestation.getId() != null) {
            throw new BadRequestAlertException("A new demandeAttestation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DemandeAttestation result = demandeAttestationRepository.save(demandeAttestation);
        return ResponseEntity.created(new URI("/api/demande-attestations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /demande-attestations : Updates an existing demandeAttestation.
     *
     * @param demandeAttestation the demandeAttestation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated demandeAttestation,
     * or with status 400 (Bad Request) if the demandeAttestation is not valid,
     * or with status 500 (Internal Server Error) if the demandeAttestation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/demande-attestations")
    @Timed
    public ResponseEntity<DemandeAttestation> updateDemandeAttestation(@RequestBody DemandeAttestation demandeAttestation) throws URISyntaxException {
        log.debug("REST request to update DemandeAttestation : {}", demandeAttestation);
        if (demandeAttestation.getId() == null) {
            return createDemandeAttestation(demandeAttestation);
        }
        DemandeAttestation result = demandeAttestationRepository.save(demandeAttestation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, demandeAttestation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /demande-attestations : get all the demandeAttestations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of demandeAttestations in body
     */
    @GetMapping("/demande-attestations")
    @Timed
    public List<DemandeAttestation> getAllDemandeAttestations() {
        log.debug("REST request to get all DemandeAttestations");
        return demandeAttestationRepository.findAll();
        }

    /**
     * GET  /demande-attestations/:id : get the "id" demandeAttestation.
     *
     * @param id the id of the demandeAttestation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the demandeAttestation, or with status 404 (Not Found)
     */
    @GetMapping("/demande-attestations/{id}")
    @Timed
    public ResponseEntity<DemandeAttestation> getDemandeAttestation(@PathVariable Long id) {
        log.debug("REST request to get DemandeAttestation : {}", id);
        DemandeAttestation demandeAttestation = demandeAttestationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(demandeAttestation));
    }

    /**
     * DELETE  /demande-attestations/:id : delete the "id" demandeAttestation.
     *
     * @param id the id of the demandeAttestation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/demande-attestations/{id}")
    @Timed
    public ResponseEntity<Void> deleteDemandeAttestation(@PathVariable Long id) {
        log.debug("REST request to delete DemandeAttestation : {}", id);
        demandeAttestationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
