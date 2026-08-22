export const content = {
  hero: {
    title: "Boutique <br class='block md:hidden'/>  online",
    carouselImages: [
      {
        image:"/images/main/hero.webp",
        color:"text-white"
      },
      {
        image:"/images/fragances/men-hero.webp",
        color:"text-black"
      },
      {
        image:"/images/fragances/women-hero.webp",
        color:"text-white"
      },
      {
        image:"/images/clothes/men-hero.webp",
        color:"text-black"
      },
      {
        image:"/images/clothes/women-hero.webp",
        color:"text-white"
      },
      {
        image:"/images/best-seller/hero.webp",
        color:"text-black"
      }, 
    ],
  },
  fashion: {
    title: "Moda exclusiva",
    buttons: [
      {
        label: "Mujer",
        href: "/fashion/women",
      },
      {
        label: "Hombre",
        href: "/fashion/men",
      },
    ],
  },
  categories: [
    {
      title: "fragancias",
      img: "fragance",
      href: "/fragances/men",
      button: {
        label: "Ver más",

      },
    },
    {
      title: "moda",
      img: "fashion",
      href: "/clothes/men",
      button: {
        label: "Ver más",

      },
    },
    {
      title: "lifestyle",
      img: "lifestyle",
      href: "/clothes/women",
      button: {
        label: "Ver más",

      },
    },
    {
      title: "best sellers",
      img: "best-seller",
      href: "/best-sellers",
      button: {
        label: "Ver más",

      },
    },
  ],
  collection: {
    title: "THE COLLECTION",
    description:
      "Descubre piezas seleccionadas para quienes valoran el estilo y la exclusividad.",
  },
  bestSeller: {
    title: "BEST SELLER",
    description: "Lo que todos están buscando.",
    category: [
      {
        name: "Mujer",
        href: "/best-sellers",
      },
      {
        name: "Hombre",
        href: "/best-sellers",
      },
    ],
    collections: [
      {
        image: "best-seller-1",
        name: "Expresa Tu Esencia",
        href: "#",
        description:
          "Lujo discreto y amaderado que deja <br class='hidden lg:block'/> una huella eterna",
        label: "Ver Ahora",
      },
      {
        image: "best-seller-2",
        name: "Minimalismo que Impone",
        href: "#",
        description:
          "Diseñado para quienes entienden que el <br class='hidden lg:block'/> verdadero lujo está en los detalles.",
        label: "Ver Ahora",
      },
      {
        image: "best-seller-3",
        name: "Estilo Sin Esfuerzo",
        href: "#",
        description:
          "Dulce, oscuro y provocador, seducción que <br class='hidden xl:block'/> rompe todas las reglas",
        label: "Ver Ahora",
      },
      {
        image: "best-seller-4",
        name: "Comodidad Elevada",
        href: "#",
        description:
          "Prendas versátiles que combinan estilo, <br class='hidden lg:block'/> confort y presencia en cualquier ocasión.",
        label: "Ver Ahora",
      },
    ],
  },
  banners: [
    {
      title: "Lifestyle <br class='block md:hidden'/> Essentials",
      description:
        "Todo lo que necesitas para completar tu estilo, en un solo lugar.",
      button: {
        label: "VER lifestyle",
        link: "clothes/women",
      },
    },
    {
      title: "Tu aroma, tu <br class='block md:hidden'/>  esencia",
      description:
        "Encuentra fragancias que dejan huella y convierten cada momento en algo memorable.",
      button: {
        label: "Ver Fragancias",
        link: "fragances/women",
      },
    },
    {
      title: "Los favoritos de <br class='block md:hidden'/>  todos",
      description:
        "Descubre los productos más amados y entiende por qué siempre vuelven por ellos.",
      button: {
        label: "Ver Best Sellers",
        link: "best-sellers",
      },
    },
    {
      title: "Eleva tu <br class='block md:hidden'/>  estilo",
      description:
        "Piezas seleccionadas para complementar tu look y destacar tu personalidad.",
      button: {
        label: "Ver Fashion",
        link: "clothes/men",
      },
    },
  ],
};
