package com.soa.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.soa.app.domain.Absences;

import com.soa.app.repository.AbsencesRepository;
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
 * REST controller for managing Absences.
 */
@RestController
@RequestMapping("/api")
public class AbsencesResource {

    private final Logger log = LoggerFactory.getLogger(AbsencesResource.class);

    private static final String ENTITY_NAME = "absences";

    private final AbsencesRepository absencesRepository;

    public AbsencesResource(AbsencesRepository absencesRepository) {
        this.absencesRepository = absencesRepository;
    }

    /**
     * POST  /absences : Create a new absences.
     *
     * @param absences the absences to create
     * @return the ResponseEntity with status 201 (Created) and with body the new absences, or with status 400 (Bad Request) if the absences has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/absences")
    @Timed
    public ResponseEntity<Absences> createAbsences(@RequestBody Absences absences) throws URISyntaxException {
        log.debug("REST request to save Absences : {}", absences);
        if (absences.getId() != null) {
            throw new BadRequestAlertException("A new absences cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Absences result = absencesRepository.save(absences);
        return ResponseEntity.created(new URI("/api/absences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /absences : Updates an existing absences.
     *
     * @param absences the absences to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated absences,
     * or with status 400 (Bad Request) if the absences is not valid,
     * or with status 500 (Internal Server Error) if the absences couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/absences")
    @Timed
    public ResponseEntity<Absences> updateAbsences(@RequestBody Absences absences) throws URISyntaxException {
        log.debug("REST request to update Absences : {}", absences);
        if (absences.getId() == null) {
            return createAbsences(absences);
        }
        Absences result = absencesRepository.save(absences);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, absences.getId().toString()))
            .body(result);
    }

    /**
     * GET  /absences : get all the absences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of absences in body
     */
    @GetMapping("/absences")
    @Timed
    public List<Absences> getAllAbsences() {
        log.debug("REST request to get all Absences");
        return absencesRepository.findAll();
        }

    /**
     * GET  /absences/:id : get the "id" absences.
     *
     * @param id the id of the absences to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the absences, or with status 404 (Not Found)
     */
    @GetMapping("/absences/{id}")
    @Timed
    public ResponseEntity<Absences> getAbsences(@PathVariable Long id) {
        log.debug("REST request to get Absences : {}", id);
        Absences absences = absencesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(absences));
    }

    /**
     * DELETE  /absences/:id : delete the "id" absences.
     *
     * @param id the id of the absences to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/absences/{id}")
    @Timed
    public ResponseEntity<Void> deleteAbsences(@PathVariable Long id) {
        log.debug("REST request to delete Absences : {}", id);
        absencesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
