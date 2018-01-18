package com.soa.app.web.rest;

import com.soa.app.SoaApp;

import com.soa.app.domain.Enseignant;
import com.soa.app.repository.EnseignantRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.soa.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EnseignantResource REST controller.
 *
 * @see EnseignantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoaApp.class)
public class EnseignantResourceIntTest {

    private static final Long DEFAULT_CIN = 1L;
    private static final Long UPDATED_CIN = 2L;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SEXE = "AAAAAAAAAA";
    private static final String UPDATED_SEXE = "BBBBBBBBBB";

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnseignantMockMvc;

    private Enseignant enseignant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnseignantResource enseignantResource = new EnseignantResource(enseignantRepository);
        this.restEnseignantMockMvc = MockMvcBuilders.standaloneSetup(enseignantResource)
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
    public static Enseignant createEntity(EntityManager em) {
        Enseignant enseignant = new Enseignant()
            .cin(DEFAULT_CIN)
            .name(DEFAULT_NAME)
            .lastname(DEFAULT_LASTNAME)
            .email(DEFAULT_EMAIL)
            .dn(DEFAULT_DN)
            .sexe(DEFAULT_SEXE);
        return enseignant;
    }

    @Before
    public void initTest() {
        enseignant = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnseignant() throws Exception {
        int databaseSizeBeforeCreate = enseignantRepository.findAll().size();

        // Create the Enseignant
        restEnseignantMockMvc.perform(post("/api/enseignants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enseignant)))
            .andExpect(status().isCreated());

        // Validate the Enseignant in the database
        List<Enseignant> enseignantList = enseignantRepository.findAll();
        assertThat(enseignantList).hasSize(databaseSizeBeforeCreate + 1);
        Enseignant testEnseignant = enseignantList.get(enseignantList.size() - 1);
        assertThat(testEnseignant.getCin()).isEqualTo(DEFAULT_CIN);
        assertThat(testEnseignant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEnseignant.getLastname()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testEnseignant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEnseignant.getDn()).isEqualTo(DEFAULT_DN);
        assertThat(testEnseignant.getSexe()).isEqualTo(DEFAULT_SEXE);
    }

    @Test
    @Transactional
    public void createEnseignantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enseignantRepository.findAll().size();

        // Create the Enseignant with an existing ID
        enseignant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnseignantMockMvc.perform(post("/api/enseignants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enseignant)))
            .andExpect(status().isBadRequest());

        // Validate the Enseignant in the database
        List<Enseignant> enseignantList = enseignantRepository.findAll();
        assertThat(enseignantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnseignants() throws Exception {
        // Initialize the database
        enseignantRepository.saveAndFlush(enseignant);

        // Get all the enseignantList
        restEnseignantMockMvc.perform(get("/api/enseignants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enseignant.getId().intValue())))
            .andExpect(jsonPath("$.[*].cin").value(hasItem(DEFAULT_CIN.intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].dn").value(hasItem(DEFAULT_DN.toString())))
            .andExpect(jsonPath("$.[*].sexe").value(hasItem(DEFAULT_SEXE.toString())));
    }

    @Test
    @Transactional
    public void getEnseignant() throws Exception {
        // Initialize the database
        enseignantRepository.saveAndFlush(enseignant);

        // Get the enseignant
        restEnseignantMockMvc.perform(get("/api/enseignants/{id}", enseignant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enseignant.getId().intValue()))
            .andExpect(jsonPath("$.cin").value(DEFAULT_CIN.intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.dn").value(DEFAULT_DN.toString()))
            .andExpect(jsonPath("$.sexe").value(DEFAULT_SEXE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnseignant() throws Exception {
        // Get the enseignant
        restEnseignantMockMvc.perform(get("/api/enseignants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnseignant() throws Exception {
        // Initialize the database
        enseignantRepository.saveAndFlush(enseignant);
        int databaseSizeBeforeUpdate = enseignantRepository.findAll().size();

        // Update the enseignant
        Enseignant updatedEnseignant = enseignantRepository.findOne(enseignant.getId());
        // Disconnect from session so that the updates on updatedEnseignant are not directly saved in db
        em.detach(updatedEnseignant);
        updatedEnseignant
            .cin(UPDATED_CIN)
            .name(UPDATED_NAME)
            .lastname(UPDATED_LASTNAME)
            .email(UPDATED_EMAIL)
            .dn(UPDATED_DN)
            .sexe(UPDATED_SEXE);

        restEnseignantMockMvc.perform(put("/api/enseignants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnseignant)))
            .andExpect(status().isOk());

        // Validate the Enseignant in the database
        List<Enseignant> enseignantList = enseignantRepository.findAll();
        assertThat(enseignantList).hasSize(databaseSizeBeforeUpdate);
        Enseignant testEnseignant = enseignantList.get(enseignantList.size() - 1);
        assertThat(testEnseignant.getCin()).isEqualTo(UPDATED_CIN);
        assertThat(testEnseignant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEnseignant.getLastname()).isEqualTo(UPDATED_LASTNAME);
        assertThat(testEnseignant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEnseignant.getDn()).isEqualTo(UPDATED_DN);
        assertThat(testEnseignant.getSexe()).isEqualTo(UPDATED_SEXE);
    }

    @Test
    @Transactional
    public void updateNonExistingEnseignant() throws Exception {
        int databaseSizeBeforeUpdate = enseignantRepository.findAll().size();

        // Create the Enseignant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnseignantMockMvc.perform(put("/api/enseignants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enseignant)))
            .andExpect(status().isCreated());

        // Validate the Enseignant in the database
        List<Enseignant> enseignantList = enseignantRepository.findAll();
        assertThat(enseignantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnseignant() throws Exception {
        // Initialize the database
        enseignantRepository.saveAndFlush(enseignant);
        int databaseSizeBeforeDelete = enseignantRepository.findAll().size();

        // Get the enseignant
        restEnseignantMockMvc.perform(delete("/api/enseignants/{id}", enseignant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Enseignant> enseignantList = enseignantRepository.findAll();
        assertThat(enseignantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enseignant.class);
        Enseignant enseignant1 = new Enseignant();
        enseignant1.setId(1L);
        Enseignant enseignant2 = new Enseignant();
        enseignant2.setId(enseignant1.getId());
        assertThat(enseignant1).isEqualTo(enseignant2);
        enseignant2.setId(2L);
        assertThat(enseignant1).isNotEqualTo(enseignant2);
        enseignant1.setId(null);
        assertThat(enseignant1).isNotEqualTo(enseignant2);
    }
}
