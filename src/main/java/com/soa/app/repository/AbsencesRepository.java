package com.soa.app.repository;

import com.soa.app.domain.Absences;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Absences entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbsencesRepository extends JpaRepository<Absences, Long> {

}
