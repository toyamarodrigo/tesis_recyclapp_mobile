import { Ad, News } from "@models/advertisement.type";

export const mockAds: Ad[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    description: "Aprendé a hacer compost en casa y reducí tus residuos",
    extraDescription: [
      {
        type: "paragraph",
        content:
          "El compostaje es una excelente manera de reciclar residuos orgánicos y crear abono natural para tus plantas.",
      },
      {
        type: "list",
        content: [
          "Inicia tu propio sistema de compostaje",
          "Aprende qué materiales puedes incluir",
          "Descubre cómo mantenerlo correctamente",
        ],
      },
      {
        type: "paragraph",
        content:
          "Reducirás significativamente tu huella de carbono y obtendrás un fertilizante de alta calidad para tu jardín.",
      },
    ],
    source: "https://www.example.com",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    description: "Reciclá tus plásticos. ¡Juntos podemos salvar los océanos!",
    extraDescription: [
      {
        type: "paragraph",
        content:
          "El plástico es uno de los mayores contaminantes de nuestros océanos. Aprende a identificar los diferentes tipos de plásticos reciclables, cómo prepararlos correctamente para el reciclaje y dónde puedes llevarlos. Descubre alternativas al plástico de un solo uso y cómo pequeños cambios en tus hábitos diarios pueden tener un gran impacto en la salud de nuestros océanos.",
      },
      {
        type: "list",
        content: [
          "Identifica los tipos de plásticos reciclables",
          "Prepara los plásticos para el reciclaje",
          "Descubre alternativas al plástico de un solo uso",
        ],
      },
      {
        type: "paragraph",
        content:
          "Juntos podemos hacer una gran diferencia en la salud de nuestros océanos.",
      },
    ],
    source: "https://www.example.com",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    description: "Descubrí los beneficios de la energía solar para tu hogar",
    extraDescription: [
      {
        type: "paragraph",
        content:
          "La energía solar es una fuente de energía limpia y renovable que puede reducir significativamente tu factura eléctrica y tu impacto ambiental. Explora los diferentes tipos de sistemas solares disponibles, los costos iniciales y a largo plazo, y los incentivos gubernamentales para la instalación de paneles solares. Aprende cómo dimensionar un sistema para tu hogar y los pasos para comenzar tu transición a la energía solar.",
      },
      {
        type: "list",
        content: [
          "Explora los diferentes tipos de sistemas solares",
          "Aprende sobre los costos iniciales y a largo plazo",
          "Descubre los incentivos gubernamentales",
        ],
      },
      {
        type: "paragraph",
        content:
          "La energía solar es una excelente opción para reducir tu huella de carbono y ahorrar dinero en tu factura eléctrica.",
      },
    ],
    source: "https://www.example.com",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507560461415-95081537e5b5",
    description: "Participá en nuestra campaña de limpieza de playas",
    extraDescription: [
      {
        type: "paragraph",
        content:
          "Las playas limpias son vitales para la salud de los ecosistemas marinos y para nuestro disfrute. Únete a nuestra próxima campaña de limpieza de playas y sé parte del cambio. Aprenderás sobre los tipos de residuos más comunes en las playas, cómo clasificarlos correctamente y el impacto positivo que tienen estas acciones. También te informaremos sobre cómo puedes organizar tu propia campaña de limpieza en tu comunidad local.",
      },
      {
        type: "list",
        content: [
          "Aprende sobre los tipos de residuos en las playas",
          "Descubre cómo clasificarlos correctamente",
          "Participa en la campaña de limpieza de playas",
        ],
      },
      {
        type: "paragraph",
        content:
          "Juntos podemos hacer una gran diferencia en la salud de nuestros océanos y playas.",
      },
    ],
    source: "https://www.example.com",
  },
];

export const mockNews: News[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce",
    title: "Nueva Planta de Reciclaje en Buenos Aires",
    description:
      "La ciudad inaugura una planta de reciclaje de última generación que procesará 200 toneladas de residuos diariamente.",
    extraDescription: [
      {
        type: "paragraph",
        content:
          "Esta nueva planta de reciclaje utiliza tecnología de punta para clasificar y procesar una amplia gama de materiales reciclables, incluyendo plásticos, papel, cartón y metales.",
      },
      {
        type: "list",
        content: [
          "Capacidad de procesamiento: 200 toneladas diarias",
          "Reducción significativa de residuos en vertederos",
          "Creación de nuevos empleos verdes",
          "Contribución a la economía circular de la ciudad",
        ],
      },
      {
        type: "image",
        content: "https://example.com/recycling-plant-image.jpg",
      },
    ],
    source: "https://www.example.com",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    title: "Ley de Energías Renovables Aprobada",
    description:
      "El Congreso aprobó una ley que incentiva el uso de energías renovables en todo el país.",
    extraDescription: [
      {
        type: "paragraph",
        content:
          "La nueva ley establece objetivos ambiciosos para aumentar la participación de las energías renovables en la matriz energética del país. Incluye incentivos fiscales para empresas y hogares que adopten tecnologías de energía limpia, como solar y eólica. También establece un fondo para investigación y desarrollo en el campo de las energías renovables. Se espera que esta ley acelere la transición hacia una economía baja en carbono y cree miles de nuevos empleos en el sector de energías limpias.",
      },
      {
        type: "list",
        content: [
          "Objetivos ambiciosos para las energías renovables",
          "Incentivos fiscales para empresas y hogares",
          "Fondo para investigación y desarrollo",
        ],
      },
      {
        type: "paragraph",
        content:
          "La ley es un paso importante hacia una economía más sostenible.",
      },
    ],
    source: "https://www.example.com",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1610392734074-02f696fd30fc",
    title: "Éxito en la Reforestación de la Selva Misionera",
    description:
      "Un proyecto de reforestación en Misiones logra plantar más de 1 millón de árboles nativos en dos años.",
    extraDescription: [
      {
        type: "paragraph",
        content:
          "Este proyecto de reforestación, liderado por una coalición de ONGs locales y el gobierno provincial, ha superado todas las expectativas. Utilizando especies de árboles nativos, el proyecto no solo ha restaurado áreas degradadas de la selva, sino que también ha creado corredores ecológicos cruciales para la fauna local. El éxito del proyecto se atribuye a la participación activa de las comunidades locales y al uso de técnicas innovadoras de plantación y monitoreo. Los científicos ya han observado un aumento en la biodiversidad en las áreas reforestadas.",
      },
      {
        type: "list",
        content: [
          "Participación activa de las comunidades locales",
          "Uso de técnicas innovadoras de plantación y monitoreo",
          "Aumento en la biodiversidad",
        ],
      },
      {
        type: "paragraph",
        content:
          "El proyecto es un ejemplo de lo que se puede lograr con la colaboración y el compromiso de las comunidades locales.",
      },
    ],
    source: "https://www.example.com",
  },
];

export const mockedHistoricalPoints = [
  {
    id: 1,
    points: 100,
    date: "2023-04-15",
    description: "Compra en Local Verde",
  },
  { id: 2, points: -50, date: "2023-04-10", description: "Canje de beneficio" },
  {
    id: 3,
    points: 75,
    date: "2023-04-05",
    description: "Reciclaje en punto verde",
  },
  {
    id: 4,
    points: 200,
    date: "2023-03-30",
    description: "Compra en Local Verde",
  },
  {
    id: 5,
    points: -100,
    date: "2023-03-25",
    description: "Canje de beneficio",
  },
];

export const nonCompostableItems = [
  "Hojas o ramitas de nogal negro",
  "Cenizas de carbón o carbón vegetal",
  "Productos lácteos",
  "Plantas enfermas",
  "Grasas, manteca o aceites",
  "Huesos y restos de carne o pescado",
  "Desechos de mascotas",
  "Recortes de jardín tratados con pesticidas químicos",
  "Plásticos",
  "Metales",
  "Vidrio",
  "Telas sintéticas",
  "Madera tratada",
  "Papel de color o brillante",
  "Pegatinas o etiquetas",
  "Hojas de secadora",
  "Colillas de cigarrillos",
  "Cartón recubierto",
];

export const compostableItems = [
  "Restos de frutas y verduras",
  "Posos y filtros de café",
  "Bolsitas de té (sin grapas)",
  "Cáscaras de huevo",
  "Cáscaras de frutos secos",
  "Rollos de cartón",
  "Papel limpio",
  "Recortes de jardín",
  "Recortes de césped",
  "Plantas de interior",
  "Heno y paja",
  "Hojas",
  "Aserrín",
  "Virutas de madera",
  "Trapos de algodón y lana",
  "Pelusa de secadora y aspiradora",
  "Pelo y pelaje",
  "Cenizas de chimenea",
];

export const BenefitTypeList = [
  {
    id: "DISCOUNT",
    name: "DESCUENTO",
  },
  {
    id: "PRODUCT",
    name: "PRODUCTO GRATIS",
  },
  {
    id: "DOUBLEPRODUCT",
    name: "2 * 1",
  },
];

export enum BenefitType {
  DISCOUNT = "DISCOUNT",
  PRODUCT = "PRODUCT",
  DOUBLEPRODUCT = "DOUBLEPRODUCT",
}
