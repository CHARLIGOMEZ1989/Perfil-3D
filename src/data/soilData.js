// Datos expandidos de horizontes del suelo con información edafológica completa y avanzada

export const soilHorizons = [
  {
    id: "O",
    name: "Horizonte O (Orgánico)",
    depth: { start: 0, end: 5 },
    color: "#2D1810",
    
    // Propiedades químicas básicas
    pH: 5.2,
    acidezIntercambiable: 0.8,
    basesTotales: 12.5,
    
    // Propiedades químicas avanzadas
    conductividadElectrica: 0.15, // dS/m
    capacidadIntercambioCationico: 45.2, // cmol/kg
    materiaOrganica: 85.0, // %
    carbonoOrganico: 49.3, // %
    nitrogeno: 2.8, // %
    relacionCN: 17.6,
    fosforo: 125, // mg/kg
    potasio: 280, // mg/kg
    calcio: 1850, // mg/kg
    magnesio: 420, // mg/kg
    
    // Propiedades físicas
    textureClass: "Franco",
    arena: 45, // %
    limo: 35, // %
    arcilla: 20, // %
    densidadAparente: 0.8, // g/cm³
    densidadReal: 2.1, // g/cm³
    porosidadTotal: 62, // %
    porosidadEfectiva: 45, // %
    permeabilidad: 0.9,
    
    // Características morfológicas
    fragments: "Materia orgánica 85%",
    description: "Capa orgánica superficial rica en humus",
    hasMottle: false,
    hasCracks: false,
    estructura: "Granular fina",
    consistencia: "Friable",
    
    // Clasificación taxonómica
    orden: "Mollisol",
    suborden: "Udoll",
    granGrupo: "Argiudoll",
    
    // Índices de calidad
    indiceCalidad: 8.5, // 0-10
    fertilidad: "Alta",
    salinidad: "No salino",
    
    story: [
      "Bienvenido al fascinante mundo del suelo. Comenzamos nuestro viaje en la superficie...",
      "El Horizonte O es la capa más superficial, rica en materia orgánica fresca y en descomposición.",
      "Con un 85% de materia orgánica, esta capa presenta una relación C/N de 17.6, indicando una descomposición activa.",
      "Los microorganismos trabajan incansablemente, transformando la materia orgánica en humus estable.",
      "La alta capacidad de intercambio catiónico (45.2 cmol/kg) permite una excelente retención de nutrientes.",
      "Su estructura granular fina y baja densidad aparente (0.8 g/cm³) facilitan la infiltración del agua.",
    ],
  },
  {
    id: "A",
    name: "Horizonte A (Mineral-Orgánico)",
    depth: { start: 5, end: 20 },
    color: "#4A3728",
    
    // Propiedades químicas básicas
    pH: 5.8,
    acidezIntercambiable: 1.2,
    basesTotales: 18.3,
    
    // Propiedades químicas avanzadas
    conductividadElectrica: 0.22,
    capacidadIntercambioCationico: 28.5,
    materiaOrganica: 4.2,
    carbonoOrganico: 2.4,
    nitrogeno: 0.18,
    relacionCN: 13.3,
    fosforo: 85,
    potasio: 195,
    calcio: 1420,
    magnesio: 315,
    
    // Propiedades físicas
    textureClass: "Franco Arenoso",
    arena: 55,
    limo: 30,
    arcilla: 15,
    densidadAparente: 1.2,
    densidadReal: 2.4,
    porosidadTotal: 50,
    porosidadEfectiva: 35,
    permeabilidad: 0.7,
    
    // Características morfológicas
    fragments: "Fragmentos rocosos 15%",
    description: "Mezcla íntima de materia orgánica y mineral",
    hasMottle: true,
    mottleColor: "#8B4513",
    hasCracks: true,
    estructura: "Granular media a gruesa",
    consistencia: "Friable a firme",
    
    // Clasificación taxonómica
    orden: "Mollisol",
    suborden: "Udoll",
    granGrupo: "Argiudoll",
    
    // Índices de calidad
    indiceCalidad: 7.8,
    fertilidad: "Media-Alta",
    salinidad: "No salino",
    
    story: [
      "Descendemos al Horizonte A, donde la magia de la mezcla ocurre...",
      "Aquí, la materia orgánica (4.2%) se combina íntimamente con partículas minerales.",
      "La textura franco-arenosa proporciona un equilibrio ideal entre drenaje y retención.",
      "Las raíces de las plantas penetran esta capa, creando bioporos y liberando exudados.",
      "Los agregados del suelo se forman por la acción de hongos micorrízicos y lombrices.",
      "Esta zona es fundamental para el almacenamiento de carbono y el ciclo de nutrientes.",
    ],
  },
  {
    id: "B1",
    name: "Horizonte B1 (Acumulación)",
    depth: { start: 20, end: 45 },
    color: "#8B4513",
    
    // Propiedades químicas básicas
    pH: 6.2,
    acidezIntercambiable: 0.6,
    basesTotales: 24.7,
    
    // Propiedades químicas avanzadas
    conductividadElectrica: 0.18,
    capacidadIntercambioCationico: 35.8,
    materiaOrganica: 2.1,
    carbonoOrganico: 1.2,
    nitrogeno: 0.09,
    relacionCN: 13.3,
    fosforo: 45,
    potasio: 165,
    calcio: 1680,
    magnesio: 385,
    
    // Propiedades físicas
    textureClass: "Franco Arcilloso",
    arena: 35,
    limo: 35,
    arcilla: 30,
    densidadAparente: 1.4,
    densidadReal: 2.5,
    porosidadTotal: 44,
    porosidadEfectiva: 25,
    permeabilidad: 0.4,
    
    // Características morfológicas
    fragments: "Concreciones Fe-Mn 8%",
    description: "Zona de acumulación de arcillas y óxidos",
    hasMottle: true,
    mottleColor: "#CD853F",
    hasCracks: true,
    estructura: "Bloques subangulares medios",
    consistencia: "Firme",
    
    // Clasificación taxonómica
    orden: "Mollisol",
    suborden: "Udoll",
    granGrupo: "Argiudoll",
    
    // Índices de calidad
    indiceCalidad: 6.5,
    fertilidad: "Media",
    salinidad: "No salino",
    
    story: [
      "Entramos en el Horizonte B1, la zona de acumulación activa...",
      "Las arcillas iluviales (30%) se depositan aquí por procesos de translocación.",
      "Los procesos de óxido-reducción forman concreciones de hierro y manganeso.",
      "La estructura en bloques subangulares indica procesos pedogenéticos avanzados.",
      "Esta capa actúa como un reservorio de nutrientes intercambiables.",
      "La menor permeabilidad (0.4) puede generar saturación temporal en épocas húmedas.",
    ],
  },
  {
    id: "B2",
    name: "Horizonte B2 (Iluviación)",
    depth: { start: 45, end: 80 },
    color: "#CD853F",
    
    // Propiedades químicas básicas
    pH: 6.5,
    acidezIntercambiable: 0.4,
    basesTotales: 31.2,
    
    // Propiedades químicas avanzadas
    conductividadElectrica: 0.25,
    capacidadIntercambioCationico: 42.1,
    materiaOrganica: 1.2,
    carbonoOrganico: 0.7,
    nitrogeno: 0.05,
    relacionCN: 14.0,
    fosforo: 25,
    potasio: 145,
    calcio: 2150,
    magnesio: 485,
    
    // Propiedades físicas
    textureClass: "Arcilloso",
    arena: 25,
    limo: 30,
    arcilla: 45,
    densidadAparente: 1.6,
    densidadReal: 2.6,
    porosidadTotal: 38,
    porosidadEfectiva: 15,
    permeabilidad: 0.2,
    
    // Características morfológicas
    fragments: "Nódulos calcáreos 12%",
    description: "Máxima acumulación de arcillas iluviales",
    hasMottle: true,
    mottleColor: "#DEB887",
    hasCracks: false,
    estructura: "Bloques angulares grandes",
    consistencia: "Muy firme",
    
    // Clasificación taxonómica
    orden: "Mollisol",
    suborden: "Udoll",
    granGrupo: "Argiudoll",
    
    // Índices de calidad
    indiceCalidad: 5.2,
    fertilidad: "Media-Baja",
    salinidad: "Ligeramente salino",
    
    story: [
      "Llegamos al Horizonte B2, donde la acumulación alcanza su máximo...",
      "Esta es la zona de máxima concentración de arcillas iluviales (45%).",
      "Los nódulos calcáreos se forman por precipitación de carbonatos en micrositios.",
      "La alta densidad aparente (1.6 g/cm³) puede limitar la penetración radicular.",
      "Los procesos pedogenéticos han transformado significativamente el material original.",
      "Esta capa puede actuar como una barrera hidráulica para el movimiento descendente del agua.",
    ],
  },
  {
    id: "C",
    name: "Horizonte C (Material Parental)",
    depth: { start: 80, end: 120 },
    color: "#DEB887",
    
    // Propiedades químicas básicas
    pH: 7.1,
    acidezIntercambiable: 0.2,
    basesTotales: 42.8,
    
    // Propiedades químicas avanzadas
    conductividadElectrica: 0.35,
    capacidadIntercambioCationico: 18.5,
    materiaOrganica: 0.5,
    carbonoOrganico: 0.3,
    nitrogeno: 0.02,
    relacionCN: 15.0,
    fosforo: 15,
    potasio: 125,
    calcio: 2850,
    magnesio: 625,
    
    // Propiedades físicas
    textureClass: "Franco Limoso",
    arena: 30,
    limo: 50,
    arcilla: 20,
    densidadAparente: 1.7,
    densidadReal: 2.7,
    porosidadTotal: 37,
    porosidadEfectiva: 20,
    permeabilidad: 0.6,
    
    // Características morfológicas
    fragments: "Roca meteorizada 35%",
    description: "Material parental poco alterado por pedogénesis",
    hasMottle: false,
    hasCracks: false,
    estructura: "Masiva",
    consistencia: "Muy firme a dura",
    
    // Clasificación taxonómica
    orden: "Material parental",
    suborden: "Sedimento aluvial",
    granGrupo: "Cuaternario",
    
    // Índices de calidad
    indiceCalidad: 3.5,
    fertilidad: "Baja",
    salinidad: "Moderadamente salino",
    
    story: [
      "Finalmente, alcanzamos el Horizonte C, el material parental...",
      "Aquí encontramos el material original del cual se formó todo el perfil superior.",
      "La roca meteorizada (35%) mantiene aún muchas características del material original.",
      "Los procesos de formación del suelo han tenido menor impacto en esta profundidad.",
      "Esta capa proporciona la base mineral y la reserva de elementos para el perfil.",
      "Representa el punto de partida de la fascinante historia de formación del suelo.",
    ],
  },
]

// Narración de introducción expandida
export const introStory = [
  "🌱 Bienvenido al Análisis Profesional del Perfil de Suelo",
  "Estás a punto de explorar uno de los ecosistemas más complejos y fundamentales de la Tierra.",
  "Este perfil representa miles de años de procesos pedogenéticos que han transformado el material parental.",
  "Cada horizonte cuenta una historia única de formación, transformación y evolución biogeoquímica.",
  "Observa cómo cada capa tiene características distintivas, funciones específicas y propiedades únicas.",
  "Los datos presentados siguen estándares internacionales de análisis de suelos (USDA, FAO, IUSS).",
  "Prepárate para descubrir los secretos científicos ocultos bajo nuestros pies...",
]

// Constantes científicas y referencias
export const soilConstants = {
  clasificacionTextural: {
    "Arenoso": { arena: ">85%", limo: "<15%", arcilla: "<10%" },
    "Franco Arenoso": { arena: "70-85%", limo: "15-30%", arcilla: "10-15%" },
    "Franco": { arena: "45-70%", limo: "15-45%", arcilla: "15-25%" },
    "Franco Arcilloso": { arena: "20-45%", limo: "15-35%", arcilla: "25-40%" },
    "Arcilloso": { arena: "<45%", limo: "<40%", arcilla: ">40%" },
    "Franco Limoso": { arena: "<50%", limo: ">50%", arcilla: "<27%" },
  },
  
  interpretacionpH: {
    "Extremadamente ácido": "<4.5",
    "Muy ácido": "4.5-5.0",
    "Ácido": "5.1-6.0",
    "Ligeramente ácido": "6.1-6.5",
    "Neutro": "6.6-7.3",
    "Ligeramente alcalino": "7.4-7.8",
    "Alcalino": "7.9-8.4",
    "Muy alcalino": ">8.4",
  },
  
  interpretacionCE: {
    "No salino": "<2 dS/m",
    "Ligeramente salino": "2-4 dS/m",
    "Moderadamente salino": "4-8 dS/m",
    "Altamente salino": "8-16 dS/m",
    "Extremadamente salino": ">16 dS/m",
  },
  
  interpretacionMO: {
    "Muy baja": "<1%",
    "Baja": "1-2%",
    "Media": "2-4%",
    "Alta": "4-6%",
    "Muy alta": ">6%",
  },
}

// Métodos de análisis estándar
export const metodosAnalisis = {
  pH: "Potenciometría en agua 1:2.5 (USDA)",
  CE: "Conductivimetría en extracto de saturación (Richards, 1954)",
  MO: "Walkley-Black modificado (Nelson & Sommers, 1996)",
  CIC: "Acetato de amonio 1N pH 7.0 (Chapman, 1965)",
  textura: "Método de Bouyoucos (Gee & Bauder, 1986)",
  densidad: "Método del cilindro (Blake & Hartge, 1986)",
}

