package com.soa.app.web.rest;

import com.soa.app.SoaApp;

import com.soa.app.domain.Absences;
import com.soa.app.repository.AbsencesRepository;
import com.soa.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.soa.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AbsencesResource REST controller.
 *
 * @see AbsencesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoaApp.class)
public class AbsencesResourceIntTest {

    private static final Float DEFAULT_NB_ABSENCES = 1F;
    private static final Float UPDATED_NB_ABSENCES = 2F;

    @Autowired
    private AbsencesRepository absencesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAbsencesMockMvc;

    private Absences absences;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AbsencesResource absencesResource = new AbsencesResource(absencesRepository);
        this.restAbsencesMockMvc = MockMvcBuilders.standaloneSetup(absencesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Absences createEntity(EntityManager em) {
        Absences absences = new Absences()
            .nbAbsences(DEFAULT_NB_ABSENCES);
        return absences;
    }

    @Before
    public void initTest() {
        absences = createEntity(em);
    }

    @Test
    @Transactional
    public void createAbsences() throws Exception {
        int databaseSizeBeforeCreate = absencesRepository.findAll().size();

        // Create the Absences
        restAbsencesMockMvc.perform(post("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(absences)))
            .andExpect(status().isCreated());

        // Validate the Absences in the database
        List<Absences> absencesList = absencesRepository.findAll();
        assertThat(absencesList).hasSize(databaseSizeBeforeCreate + 1);
        Absences testAbsences = absencesList.get(absencesList.size() - 1);
        assertThat(testAbsences.getNbAbsences()).isEqualTo(DEFAULT_NB_ABSENCES);
    }

    @Test
    @Transactional
    public void createAbsencesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = absencesRepository.findAll().size();

        // Create the Absences with an existing ID
        absences.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAbsencesMockMvc.perform(post("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(absences)))
            .andExpect(status().isBadRequest());

        // Validate the Absences in the database
        List<Absences> absencesList = absencesRepository.findAll();
        assertThat(absencesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAbsences() throws Exception {
        // Initialize the database
        absencesRepository.saveAndFlush(absences);

        // Get all the absencesList
        restAbsencesMockMvc.perform(get("/api/absences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(absences.getId().intValue())))
            .andExpect(jsonPath("$.[*].nbAbsences").value(hasItem(DEFAULT_NB_ABSENCES.doubleValue())));
    }

    @Test
    @Transactional
    public void getAbsences() throws Exception {
        // Initialize the database
        absencesRepository.saveAndFlush(absences);

        // Get the absences
        restAbsencesMockMvc.perform(get("/api/absences/{id}", absences.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(absences.getId().intValue()))
            .andExpect(jsonPath("$.nbAbsences").value(DEFAULT_NB_ABSENCES.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAbsences() throws Exception {
        // Get the absences
        restAbsencesMockMvc.perform(get("/api/absences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAbsences() throws Exception {
        // Initialize the database
        absencesRepository.saveAndFlush(absences);
        int databaseSizeBeforeUpdate = absencesRepository.findAll().size();

        // Update the absences
        Absences updatedAbsences = absencesRepository.findOne(absences.getId());
        // Disconnect from session so that the updates on updatedAbsences are not directly saved in db
        em.detach(updatedAbsences);
        updatedAbsences
            .nbAbsences(UPDATED_NB_ABSENCES);

        restAbsencesMockMvc.perform(put("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAbsences)))
            .andExpect(status().isOk());

        // Validate the Absences in the database
        List<Absences> absencesList = absencesRepository.findAll();
        assertThat(absencesList).hasSize(databaseSizeBeforeUpdate);
        Absences testAbsences = absencesList.get(absencesList.size() - 1);
        assertThat(testAbsences.getNbAbsences()).isEqualTo(UPDATED_NB_ABSENCES);
    }

    @Test
    @Transactional
    public void updateNonExistingAbsences() throws Exception {
        int databaseSizeBeforeUpdate = absencesRepository.findAll().size();

        // Create the Absences

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAbsencesMockMvc.perform(put("/api/absences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(absences)))
            .andExpect(status().isCreated());

        // Validate the Absences in the database
        List<Absences> absencesList = absencesRepository.findAll();
        assertThat(absencesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAbsences() throws Exception {
        // Initialize the database
        absencesRepository.saveAndFlush(absences);
        int databaseSizeBeforeDelete = absencesRepository.findAll().size();

        // Get the absences
        restAbsencesMockMvc.perform(delete("/api/absences/{id}", absences.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Absences> absencesList = absencesRepository.findAll();
        assertThat(absencesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Absences.class);
        Absences absences1 = new Absences();
        absences1.setId(1L);
        Absences absences2 = new Absences();
        absences2.setId(absences1.getId());
        assertThat(absences1).isEqualTo(absences2);
        absences2.setId(2L);
        assertThat(absences1).isNotEqualTo(absences2);
        absences1.setId(null);
        assertThat(absences1).isNotEqualTo(absences2);
    }
}
