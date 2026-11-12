import type { Question, SectionId } from '../types'

/** Original development fixtures, NOT official IMAT questions or expert-reviewed prep.
 * Each row starts with the correct option; q rotates it to vary the sample paper.
 * No exam material is scraped, copied or fetched at runtime. */
type Row = [string, string, string, string, string, string, string]
function questions(section: SectionId, rows: Row[], passage?: Question['passage']): Question[] {
  return rows.map(([prompt, correct, b, c, d, e, explanation], index) => {
    const options = [correct, b, c, d, e].map((text, i) => ({ id: `o${i}`, text }))
    const offset = index % 5
    return {
      id: `dev-${passage?.id ?? section}-${index + 1}`,
      section, prompt, options: [...options.slice(offset), ...options.slice(0, offset)],
      correctOptionId: 'o0', explanation, passage,
      source: { kind: 'development', reference: 'Saturday Education original development sample v1' },
    }
  })
}

const passageA = {
  id: 'seed-study',
  text: 'Researchers divided 80 seeds of the same species into two equal groups. Both groups received the same light and temperature. One group received water daily; the other received water every third day. After two weeks, 30 seeds in the daily group and 18 in the other group had germinated. The researchers did not measure plant height or repeat the experiment.',
}
const passageB = {
  id: 'library-study',
  text: 'A town library extended its opening hours in April. Visits increased from 1,200 in March to 1,500 in April. A school reading campaign also began in April. The library director said that the figures alone could not establish why visits had increased.',
}

export const DEVELOPMENT_QUESTIONS: Question[] = [
  ...questions('reading', [
    ['Which factor was deliberately different between the seed groups?', 'Watering frequency', 'Seed species', 'Temperature', 'Light exposure', 'Group size', 'The passage states that watering frequency differed, while species, light, temperature and group size were the same.'],
    ['Which conclusion is directly supported by the seed study?', 'More seeds germinated in the daily-water group', 'Daily watering always maximises growth', 'The daily-water plants were taller', 'Every seed germinated', 'Temperature caused the difference', 'The observed germination counts were 30 and 18. Height, universal effects and temperature effects were not established.'],
  ], passageA),
  ...questions('reading', [
    ['By what percentage did library visits increase from March to April?', '25%', '20%', '30%', '15%', '125%', 'The increase was 300 visits. Dividing 300 by the March baseline of 1,200 gives 0.25, or 25%.'],
    ['Why can the library figures alone not establish the cause of the increase?', 'Opening hours and a reading campaign changed in the same month', 'Visits decreased in April', 'March had no visitors', 'The library did not count visits', 'The director proved the campaign had no effect', 'Two potential influences changed together, so these before-and-after counts do not isolate their effects.'],
  ], passageB),
  ...questions('reading', [
    ['A report says a treatment was associated with recovery in an observational study. Which additional claim is not established by that statement?', 'The treatment caused recovery', 'An association was observed', 'The study was observational', 'Recovery was studied', 'A treatment was considered', 'Association in an observational study does not by itself establish causation.'],
    ['All samples in a labelled box were refrigerated. Sample P came from that box. What follows?', 'Sample P was refrigerated', 'Sample P was frozen', 'Every refrigerated sample came from the box', 'Sample P was the only sample', 'No sample was refrigerated', 'The general statement applies to every sample in the box, including P.'],
  ]),
  ...questions('reasoning', [
    ['What is the next term in 3, 7, 15, 31, ...?', '63', '47', '62', '64', '60', 'Each term is twice the preceding term plus 1: 31 × 2 + 1 = 63.'],
    ['A bag contains only 4 red and 6 blue counters. What is the probability of drawing a red counter?', '2/5', '3/5', '1/4', '4/6', '1/10', 'There are 4 red counters out of 10 counters in total, so the probability is 4/10 = 2/5.'],
    ['A price of 80 units is reduced by 15%. What is the new price?', '68', '65', '72', '75', '92', 'The discount is 80 × 0.15 = 12 units. The new price is 80 − 12 = 68.'],
    ['All orchids are plants. No plants are minerals. Which conclusion follows?', 'No orchids are minerals', 'All plants are orchids', 'Some orchids are minerals', 'All minerals are plants', 'No orchids are plants', 'Orchids belong to the plant set, which does not overlap with the mineral set.'],
    ['A machine fills 12 bottles in 3 minutes at a constant rate. How many does it fill in 8 minutes?', '32', '24', '36', '48', '28', 'The rate is 12 ÷ 3 = 4 bottles per minute. In 8 minutes it fills 32 bottles.'],
    ['If P implies Q, and Q is false, what must be true?', 'P is false', 'P is true', 'Q is true', 'P and Q are both true', 'Nothing can be inferred about P', 'By modus tollens, if P would imply Q but Q is false, P must be false.'],
    ['Three students have a mean score of 18. Two scores are 14 and 20. What is the third?', '20', '18', '16', '22', '24', 'The total is 3 × 18 = 54. Subtracting 14 and 20 leaves 20.'],
  ]),
  ...questions('biology', [
    ['Which organelle is the principal site of aerobic ATP production in a typical animal cell?', 'Mitochondrion', 'Golgi apparatus', 'Lysosome', 'Nucleolus', 'Centrosome', 'Oxidative phosphorylation occurs at the inner mitochondrial membrane and generates most ATP during aerobic respiration.'],
    ['Which base pairs with adenine in double-stranded DNA?', 'Thymine', 'Uracil', 'Guanine', 'Cytosine', 'Ribose', 'DNA base pairing joins adenine with thymine and guanine with cytosine.'],
    ['Which process produces gametes with half the chromosome number of the parent cell?', 'Meiosis', 'Mitosis', 'Binary fission', 'Translation', 'Transcription', 'Meiosis includes a reduction division that halves chromosome number.'],
    ['What is the primary function of ribosomes?', 'Protein synthesis', 'Lipid storage', 'DNA replication', 'Waste digestion', 'ATP storage', 'Ribosomes translate messenger RNA into polypeptide chains.'],
    ['Which molecule usually carries amino acids to the ribosome?', 'tRNA', 'DNA', 'Starch', 'Glycogen', 'Cellulose', 'Transfer RNA carries a specific amino acid and pairs its anticodon with an mRNA codon.'],
    ['What is osmosis?', 'Net movement of water through a selectively permeable membrane', 'Movement of proteins through DNA', 'Active pumping of glucose', 'Breakdown of ATP', 'Movement of ribosomes into the nucleus', 'Osmosis is passive net water movement across a selectively permeable membrane down a water-potential gradient.'],
    ['Which blood component is chiefly responsible for oxygen transport?', 'Red blood cells', 'Platelets', 'Antibodies', 'Fibrin', 'Lymphocytes', 'Red blood cells contain haemoglobin, which binds and transports oxygen.'],
    ['Which blood vessels carry blood away from the heart?', 'Arteries', 'Veins', 'Venules', 'Lymph vessels', 'All capillaries', 'Arteries are defined by the direction of blood flow away from the heart, regardless of oxygen content.'],
    ['Where does most gas exchange occur in the human lung?', 'Alveoli', 'Trachea', 'Larynx', 'Diaphragm', 'Pleural cavity', 'Alveoli provide a large, thin surface adjacent to capillaries for gas exchange.'],
    ['Which hormone lowers blood glucose by promoting uptake and storage?', 'Insulin', 'Glucagon', 'Adrenaline', 'Thyroxine', 'Melatonin', 'Insulin promotes glucose uptake in responsive tissues and favours glycogen formation.'],
    ['What is the functional unit of the human kidney?', 'Nephron', 'Neuron', 'Alveolus', 'Sarcomere', 'Villus', 'Nephrons filter blood plasma and modify the filtrate through reabsorption and secretion.'],
    ['Which part of a neuron usually conducts impulses away from the cell body?', 'Axon', 'Dendrite', 'Nucleolus', 'Ribosome', 'Lysosome', 'The axon conducts action potentials towards its terminals.'],
    ['Which response is an example of innate immunity?', 'Phagocytosis by a macrophage', 'Production of a specific memory B cell', 'A secondary antibody response', 'Clonal selection of B cells', 'Antigen-specific immune memory', 'Phagocytosis by macrophages is a component of innate immune defence.'],
    ['What is the role of an enzyme?', 'To lower the activation energy of a reaction', 'To change the equilibrium constant', 'To be permanently consumed in every reaction', 'To turn every reaction into an exothermic one', 'To eliminate the need for substrates', 'An enzyme speeds a reaction by lowering its activation-energy barrier without changing its equilibrium constant.'],
    ['Which carbohydrate forms much of the plant cell wall?', 'Cellulose', 'Glycogen', 'Lactose', 'Sucrose', 'Chitin', 'Cellulose fibres provide structural support in plant cell walls.'],
    ['Where do the light-dependent reactions of photosynthesis occur?', 'Thylakoid membranes', 'Mitochondrial matrix', 'Nuclear envelope', 'Cytosol only', 'Golgi cisternae', 'Photosystems and their electron transport chain are located in chloroplast thylakoid membranes.'],
    ['A diploid cell has 16 chromosomes before meiosis. How many chromosomes are normally present in each resulting haploid cell?', '8', '4', '16', '32', '64', 'A normal meiotic reduction halves the diploid chromosome number from 16 to 8.'],
    ['In a cross Aa × Aa with complete dominance, what fraction of offspring is expected to have genotype aa?', '1/4', '1/2', '3/4', '1', '0', 'The genotype proportions are 1 AA : 2 Aa : 1 aa, so aa accounts for one quarter.'],
    ['Which feature is typical of prokaryotic cells?', 'Absence of a membrane-bound nucleus', 'A nucleus enclosed by two membranes', 'Membrane-bound mitochondria', 'Membrane-bound chloroplasts in all cells', 'A Golgi apparatus', 'Prokaryotic DNA is not enclosed in a membrane-bound nucleus.'],
    ['What is transcription?', 'Synthesis of RNA using a DNA template', 'Synthesis of DNA using a protein template', 'Assembly of amino acids at a ribosome', 'Division of the cytoplasm', 'Breakdown of glycogen', 'RNA polymerase makes an RNA strand complementary to a DNA template.'],
    ['Which tissue transports water from roots towards leaves in vascular plants?', 'Xylem', 'Phloem', 'Epidermis', 'Palisade mesophyll', 'Guard cells', 'Xylem transports water and dissolved mineral ions through the plant.'],
    ['Which structure regulates gas exchange through a leaf epidermis?', 'Stoma', 'Root hair', 'Xylem vessel', 'Pollen grain', 'Seed coat', 'Stomata are pores whose opening is regulated by guard cells.'],
    ['In natural selection, which individuals tend to contribute more alleles to later generations?', 'Those with greater reproductive success in their environment', 'Those that are always physically largest', 'Those that acquire any useful trait during life', 'Those that never experience mutation', 'Those that consume the most food regardless of reproduction', 'Natural selection acts through differences in reproductive success linked to heritable variation.'],
    ['Which linkage joins amino acids in a polypeptide?', 'Peptide bond', 'Glycosidic bond', 'Phosphodiester bond', 'Hydrogen bond only', 'Ionic bond only', 'A peptide bond links the carboxyl group of one amino acid to the amino group of another.'],
    ['During which cell-cycle phase is nuclear DNA normally replicated?', 'S phase', 'G1 phase', 'G2 phase', 'Cytokinesis', 'Metaphase', 'DNA synthesis takes place during S phase of interphase.'],
  ]),
  ...questions('chemistry', [
    ['An atom has atomic number 11. How many protons does it contain?', '11', '10', '12', '22', '23', 'Atomic number is defined as the number of protons in the nucleus.'],
    ['Which particles differ in number between isotopes of the same element?', 'Neutrons', 'Protons', 'Nuclei', 'Core protons', 'Positive charges in the nucleus', 'Isotopes have the same proton number but different neutron numbers.'],
    ['What type of bond involves sharing an electron pair between atoms?', 'Covalent', 'Ionic only', 'Metallic only', 'Gravitational', 'Nuclear', 'A covalent bond is formed by a shared pair of electrons.'],
    ['What is the pH of 0.001 mol/L HCl, assuming complete dissociation?', '3', '1', '2', '11', '13', 'For this strong acid, [H+] = 10⁻³ mol/L and pH = −log₁₀[H+] = 3.'],
    ['How many moles are present in 18 g of water? Use molar mass 18 g/mol.', '1 mol', '0.5 mol', '2 mol', '18 mol', '324 mol', 'Amount of substance equals mass divided by molar mass: 18/18 = 1 mol.'],
    ['What is the oxidation state of oxygen in H₂O?', '−2', '−1', '0', '+1', '+2', 'Hydrogen is +1 here. Charge balance gives 2(+1) + x = 0, so oxygen is −2.'],
    ['Which change is oxidation?', 'Loss of electrons', 'Gain of electrons', 'Loss of protons in every case', 'Gain of neutrons', 'A decrease in oxidation state', 'Oxidation is electron loss and corresponds to an increase in oxidation state.'],
    ['Which gas is produced when dilute hydrochloric acid reacts with calcium carbonate?', 'Carbon dioxide', 'Hydrogen', 'Oxygen', 'Nitrogen', 'Chlorine', 'Acid and carbonate react to form a salt, water and carbon dioxide.'],
    ['Which functional group is characteristic of an alcohol?', 'Hydroxyl group', 'Carboxyl group only', 'Aldehyde group', 'Amide group', 'Nitrile group', 'Alcohols contain a hydroxyl group bonded to a saturated carbon atom.'],
    ['Which formula represents an alkane?', 'C₃H₈', 'C₃H₆', 'C₃H₄', 'C₆H₆', 'C₂H₄', 'An acyclic saturated alkane has formula CₙH₂ₙ₊₂. For n = 3, this is C₃H₈.'],
    ['At constant temperature, the volume of a fixed amount of ideal gas is halved. What happens to its pressure?', 'It doubles', 'It halves', 'It stays unchanged', 'It quadruples', 'It becomes zero', 'Boyle’s law gives PV = constant, so halving volume doubles pressure.'],
    ['A solution contains 0.5 mol solute in 2 L of solution. What is its molar concentration?', '0.25 mol/L', '1 mol/L', '2.5 mol/L', '4 mol/L', '0.5 mol/L', 'Concentration is n/V = 0.5/2 = 0.25 mol/L.'],
    ['What happens to the equilibrium position when a catalyst is added?', 'It does not change', 'It always moves towards products', 'It always moves towards reactants', 'It stops all reactions', 'It makes the equilibrium constant zero', 'A catalyst accelerates forward and reverse reactions without changing the equilibrium position.'],
    ['Which substance is a Brønsted–Lowry acid?', 'A proton donor', 'A proton acceptor only', 'An electron-pair donor only', 'Any substance containing carbon', 'Any neutral salt', 'A Brønsted–Lowry acid donates a proton to a base.'],
    ['Which intermolecular interaction helps explain the relatively high boiling point of water?', 'Hydrogen bonding', 'Metallic bonding', 'Nuclear fusion', 'Covalent bonds between separate water molecules', 'Gravitational attraction alone', 'Hydrogen bonding between water molecules increases the energy needed to separate them.'],
    ['How many electrons are present in a neutral magnesium atom with atomic number 12?', '12', '10', '14', '24', '6', 'A neutral atom has equal numbers of electrons and protons, so magnesium has 12 electrons.'],
    ['Which quantity is conserved in an ordinary balanced chemical reaction?', 'The number of atoms of each element', 'The number of molecules of each substance', 'The volume of every gas', 'The colour of the mixture', 'The physical state of each substance', 'Chemical reactions rearrange atoms, conserving the number of atoms of each element.'],
  ]),
  ...questions('physicsMath', [
    ['A cyclist travels 150 m in 30 s. What is the average speed?', '5 m/s', '3 m/s', '15 m/s', '30 m/s', '45 m/s', 'Average speed is distance divided by elapsed time: 150/30 = 5 m/s.'],
    ['What net force accelerates a 3 kg object at 4 m/s²?', '12 N', '0.75 N', '1.33 N', '7 N', '24 N', 'Newton’s second law gives F = ma = 3 × 4 = 12 N.'],
    ['A 10 Ω resistor carries a current of 0.2 A. What is the potential difference across it?', '2 V', '0.02 V', '5 V', '20 V', '50 V', 'Ohm’s law gives V = IR = 0.2 × 10 = 2 V.'],
    ['A device transfers 600 J of energy in 20 s. What is its average power?', '30 W', '12 W', '120 W', '300 W', '12,000 W', 'Power is energy transferred per unit time: 600/20 = 30 W.'],
    ['What is the kinetic energy of a 2 kg object moving at 3 m/s?', '9 J', '3 J', '6 J', '12 J', '18 J', 'Kinetic energy is ½mv² = ½ × 2 × 3² = 9 J.'],
    ['A wave has frequency 5 Hz and wavelength 2 m. What is its speed?', '10 m/s', '2.5 m/s', '0.4 m/s', '7 m/s', '25 m/s', 'Wave speed is v = fλ = 5 × 2 = 10 m/s.'],
    ['Solve 3x + 5 = 20.', 'x = 5', 'x = 3', 'x = 4', 'x = 6', 'x = 15', 'Subtracting 5 gives 3x = 15. Dividing by 3 gives x = 5.'],
    ['What is the area of a triangle with base 8 cm and perpendicular height 5 cm?', '20 cm²', '40 cm²', '13 cm²', '26 cm²', '10 cm²', 'Triangle area is ½ × base × height = ½ × 8 × 5 = 20 cm².'],
    ['What is log₁₀(1000)?', '3', '2', '10', '100', '0.001', 'Since 10³ = 1000, log₁₀(1000) = 3.'],
    ['What is the gradient of the line y = 4x − 7?', '4', '−7', '7', '−4', '11', 'In y = mx + c, the gradient is the coefficient m of x, here 4.'],
    ['A force of 50 N acts normally over an area of 2 m². What is the pressure?', '25 Pa', '100 Pa', '0.04 Pa', '52 Pa', '48 Pa', 'Pressure is normal force divided by area: 50/2 = 25 Pa.'],
    ['Two resistors of 3 Ω and 7 Ω are connected in series. What is their total resistance?', '10 Ω', '2.1 Ω', '4 Ω', '21 Ω', '0.476 Ω', 'Resistances in series add: 3 + 7 = 10 Ω.'],
    ['What is the probability of obtaining two heads in two independent tosses of a fair coin?', '1/4', '1/2', '3/4', '1', '0', 'Independence allows multiplication: ½ × ½ = ¼.'],
    ['What is the median of 2, 4, 7, 9, 13?', '7', '4', '9', '6', '8', 'The median is the middle value of the ordered list, which is 7.'],
    ['An object has mass 200 g and volume 50 cm³. What is its density?', '4 g/cm³', '0.25 g/cm³', '150 g/cm³', '250 g/cm³', '10,000 g/cm³', 'Density is mass divided by volume: 200/50 = 4 g/cm³.'],
  ]),
]
