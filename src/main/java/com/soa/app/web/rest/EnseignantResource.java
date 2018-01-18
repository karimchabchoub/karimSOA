package com.soa.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.soa.app.domain.Enseignant;

import com.soa.app.repository.EnseignantRepository;
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
 * REST controller for managing Enseignant.
 */
@RestController
@RequestMapping("/api")
public class EnseignantResource {

    private final Logger log = LoggerFactory.getLogger(EnseignantResource.class);

    private static final String ENTITY_NAME = "enseignant";

    private final EnseignantRepository enseignantRepository;

    public EnseignantResource(EnseignantRepository enseignantRepository) {
        this.enseignantRepository = enseignantRepository;
    }

    /**
     * POST  /enseignants : Create a new enseignant.
     *
     * @param enseignant the enseignant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enseignant, or with status 400 (Bad Request) if the enseignant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enseignants")
    @Timed
    public ResponseEntity<Enseignant> createEnseignant(@RequestBody Enseignant enseignant) throws URISyntaxException {
        log.debug("REST request to save Enseignant : {}", enseignant);
        if (enseignant.getId() != null) {
            throw new BadRequestAlertException("A new enseignant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enseignant result = enseignantRepository.save(enseignant);
        return ResponseEntity.created(new URI("/api/enseignants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enseignants : Updates an existing enseignant.
     *
     * @param enseignant the enseignant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enseignant,
     * or with status 400 (Bad Request) if the enseignant is not valid,
     * or with status 500 (Internal Server Error) if the enseignant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enseignants")
    @Timed
    public ResponseEntity<Enseignant> updateEnseignant(@RequestBody Enseignant enseignant) throws URISyntaxException {
        log.debug("REST request to update Enseignant : {}", enseignant);
        if (enseignant.getId() == null) {
            return createEnseignant(enseignant);
        }
        Enseignant result = enseignantRepository.save(enseignant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enseignant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enseignants : get all the enseignants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of enseignants in body
     */
    @GetMapping("/enseignants")
    @Timed
    public List<Enseignant> getAllEnseignants() {
        log.debug("REST request to get all Enseignants");
        return enseignantRepository.findAll();
        }

    /**
     * GET  /enseignants/:id : get the "id" enseignant.
     *
     * @param id the id of the enseignant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enseignant, or with status 404 (Not Found)
     */
    @GetMapping("/enseignants/{id}")
    @Timed
    public ResponseEntity<Enseignant> getEnseignant(@PathVariable Long id) {
        log.debug("REST request to get Enseignant : {}", id);
        Enseignant enseignant = enseignantRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enseignant));
    }

    /**
     * DELETE  /enseignants/:id : delete the "id" enseignant.
     *
     * @param id the id of the enseignant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enseignants/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnseignant(@PathVariable Long id) {
        log.debug("REST request to delete Enseignant : {}", id);
        enseignantRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
