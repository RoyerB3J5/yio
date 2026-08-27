const content = {
  header: {
    topContent: {
      paragraph: "Descubre nuestros Best Sellers",
      buttonLabel: "Ir ahora",
    },
    fracancia: {
      title: "explora nuestras <br/> fragancias",
      items: [
        { label: "Hombres", href: "/fragrances/men" },
        { label: "Mujeres", href: "/fragrances/women" },
      ],
    },
    moda: {
      title: "encuentra tu estilo <br/> en cada detalle",
      items: [
        {
          title: "Ropa",
          list: [
            { label: "Hombres", href: "/clothes/men" },
            { label: "Mujeres", href: "/clothes/women" },
          ],
        },
        {
          title: "Ropa",
          list: [
            { label: "Hombres", href: "/clothes/men" },
            { label: "Mujeres", href: "/clothes/women" },
          ],
        },
        {
          title: "Ropa",
          list: [
            { label: "Hombres", href: "/clothes/men" },
            { label: "Mujeres", href: "/clothes/women" },
          ],
        },
      ],
    },
    bestSellers: {
      title: "lo más vendido por <br/> nuestros clientes",
      items: [
        { label: "Ropa", href: "/best-sellers" },
        { label: "Fragancias", href: "/best-sellers" },
      ],
      banner: {
        title: "BEST SELLERS",
        description: "Descubre lo más <br/> vendido del momento.",
        button: {
          label: "Ver más",
          href: "/best-sellers",
        },
      },
    },
    nav: [
      { label: "Fragancias", href: "#" },
      { label: "Moda", href: "#" },
      { label: "Best Sellers", href: "#" },
    ],
    mobileContent: {
      label: "Lo más vendido del momento.",
      button: {
        label: "Ver más",
        href: "en/best-sellers",
      },
    },
    contact: {
      links: [
        { icon: "tiktok", label: "yovani.b1", href: "#" },
        { icon: "instagram", label: "@yovani.store", href: "#" },
      ],
    },
  },
  main: {
    hero: {
      title: "Boutique <br class='block md:hidden'/>  online",
      carouselImages: [
        {
          image: "/images/main/hero.webp",
          color: "text-white",
        },
        {
          image: "/images/fragances/men-hero.webp",
          color: "text-black",
        },
        {
          image: "/images/fragances/women-hero.webp",
          color: "text-white",
        },
        {
          image: "/images/clothes/men-hero.webp",
          color: "text-black",
        },
        {
          image: "/images/clothes/women-hero.webp",
          color: "text-white",
        },
        {
          image: "/images/best-seller/hero.webp",
          color: "text-black",
        },
      ],
    },
    fashion: {
      title: "Moda exclusiva",
      buttons: [
        {
          label: "Mujer",
          href: "/clothes/women",
        },
        {
          label: "Hombre",
          href: "/clothes/men",
        },
      ],
    },
    categories: [
      {
        title: "fragancias",
        img: "fragance",
        href: "/fragrances/men",
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
          href: "/fragrances/men/santal-33",
          description:
            "Lujo discreto y amaderado que deja <br class='hidden lg:block'/> una huella eterna",
          label: "Ver Ahora",
        },
        {
          image: "best-seller-2",
          name: "Minimalismo que Impone",
          href: "/clothes/men/yoga-accolade-1-4-pullover",
          description:
            "Diseñado para quienes entienden que el <br class='hidden lg:block'/> verdadero lujo está en los detalles.",
          label: "Ver Ahora",
        },
        {
          image: "best-seller-3",
          name: "Estilo Sin Esfuerzo",
          href: "/fragrances/men/bad-boy-elixir",
          description:
            "Dulce, oscuro y provocador, seducción que <br class='hidden xl:block'/> rompe todas las reglas",
          label: "Ver Ahora",
        },
        {
          image: "best-seller-4",
          name: "Comodidad Elevada",
          href: "/clothes/men/hoodies-essentials",
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
          link: "fragrances/women",
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
  },
  productBanner: [
    {
      title: "Jean Paul Gaultier <br/>Le Male ",
      description:
        "Le Male, tan viril como sexy, rinde homenaje a la figura simbólica que siempre ha inspirado a Jean Paul Gaultier: el marinero.Este perfume masculino tiene una visión inconformista de la masculinidad. La lavanda, que evoca el familiar y reconfortante aroma de la espuma de afeitar, se ve realzada por la sensualidad de la vainilla.",
      button: {
        label: "comprar",
        link: "/fragrances/men/le-male",
      },
      image: "/images/products/jean-paul.webp",
    },
    {
      title: "Dior <br/> sauvage ",
      description:
        "Sauvage se ha convertido en un nombre inconfundible en el ámbito del perfume para hombre. Disponible en eau de toilette, eau de parfum, parfum —recargables— o elixir, Sauvage despliega fragancias características que combinan frescura, potencia y nobleza.",
      button: {
        label: "comprar",
        link: "/fragrances/men/sauvage-eau-de-toilette",
      },
      image: "/images/products/dior-savage.webp",
    },
    {
      title: "alo <br/> Yoga Accolade hoodie ",
      description:
        "A todo el mundo le encanta la colección Accolade. Nuestra sudadera con capucha más vendida presenta un diseño informal con hombros caídos para un estilo impecable en el estudio de yoga y para salir a la calle, un bolsillo de canguro de gran tamaño, y un cómodo acanalado en los puños y el dobladillo. Se ha confeccionado con felpa francesa de peso medio con caída, suave por fuera y con forro polar por dentro. Sácale el máximo partido con el pantalón de chándal Accolade a juego. Encuentra el ajuste perfecto y descubre todas las formas de lucirlo.",
      button: {
        label: "comprar",
        link: "/clothes/women/yoga-accolade-hoodie",
      },
      image: "/images/products/alo-hoddie.webp",
    },
    {
      title: "Essentials <br/> hoodie  ",
      description:
        "Los hoodies de Essentials (de la marca Fear of God) son prendas urbanas premium. Destacan por su estilo minimalista, corte holgado (oversize) y tejido grueso (algodón afelpado). Ofrecen máxima comodidad y se volvieron un básico de lujo muy popular",
      button: {
        label: "comprar",
        link: "/clothes/men/hoodies-essentials",
      },
      image: "/images/products/essentials-hoddie.webp",
    },
  ],
  fragances: {
    men: {
      hero: {
        title: "Fragancias <br class='block lg:hidden'/>  Que Inspiran ",
        carouselImages: [
          {
            image: "/images/fragances/men-hero.webp",
            color: "text-black",
          },
          {
            image: "/images/fragances/women-hero.webp",
            color: "text-white",
          },
          {
            image: "/images/clothes/men-hero.webp",
            color: "text-black",
          },
          {
            image: "/images/clothes/women-hero.webp",
            color: "text-white",
          },
          {
            image: "/images/best-seller/hero.webp",
            color: "text-black",
          },
          {
            image: "/images/main/hero.webp",
            color: "text-white",
          },
        ],
        changeColor: true,
      },
      gridProducts: {
        title: "PRODUCTOS",
        filter1: "FILTROS",
        filter2: "ORDENAR POR",
        image1: "men-grid-1",
        image2: "men-grid-2",
      },
    },
    women: {
      hero: {
        title: "Fragancias <br class='block lg:hidden'/>  Que Inspiran ",
        carouselImages: [
          {
            image: "/images/fragances/women-hero.webp",
            color: "text-white",
          },
          {
            image: "/images/clothes/men-hero.webp",
            color: "text-black",
          },
          {
            image: "/images/clothes/women-hero.webp",
            color: "text-white",
          },
          {
            image: "/images/best-seller/hero.webp",
            color: "text-black",
          },
          {
            image: "/images/main/hero.webp",
            color: "text-white",
          },
          {
            image: "/images/fragances/men-hero.webp",
            color: "text-black",
          },
        ],
        changeColor: false,
      },
      gridProducts: {
        title: "PRODUCTOS",
        filter1: "FILTROS",
        filter2: "ORDENAR POR",
        image1: "women-grid-1",
      },
    },
  },
  individualFragrance: {
    button: "Comprar ahora",
    recomendado:
      "Encuentra tu <br /> siguiente <br class='hidden md:block'/> favorito.",
    tag: "NOTAS ALTAS - NOTAS DEL CORAZÓN - NOTAS BÁSICAS",
  },
  clothes: {
    men: {
      hero: {
        title: "MODA <br class='block md:hidden'/> EXCLUSIVA",
        carouselImages: [
          {
            image: "/images/clothes/men-hero.webp",
            color: "text-black",
          },
          {
            image: "/images/clothes/women-hero.webp",
            color: "text-white",
          },
          {
            image: "/images/best-seller/hero.webp",
            color: "text-black",
          },
          {
            image: "/images/main/hero.webp",
            color: "text-white",
          },
          {
            image: "/images/fragances/men-hero.webp",
            color: "text-black",
          },
          {
            image: "/images/fragances/women-hero.webp",
            color: "text-white",
          },
        ],
        changeColor: true,
      },
      gridProducts: {
        title: "PRODUCTOS",
        filter1: "FILTROS",
        filter2: "ORDENAR POR",
      },
    },
    women: {
      hero: {
        title: "MODA EXCLUSIVA",
        carouselImages: [
          {
            image: "/images/clothes/women-hero.webp",
            color: "text-white",
          },
          {
            image: "/images/best-seller/hero.webp",
            color: "text-black",
          },
          {
            image: "/images/main/hero.webp",
            color: "text-white",
          },
          {
            image: "/images/fragances/men-hero.webp",
            color: "text-black",
          },
          {
            image: "/images/fragances/women-hero.webp",
            color: "text-white",
          },
          {
            image: "/images/clothes/men-hero.webp",
            color: "text-black",
          },
        ],
        changeColor: false,
      },
      gridProducts: {
        title: "PRODUCTOS",
        filter1: "FILTROS",
        filter2: "ORDENAR POR",
      },
    },
  },
  individualClothes: {
    button: "Comprar ahora",
    estilo: "Acopla tu Estilo",
    recomendado:
      "Encuentra tu <br /> siguiente <br class='hidden md:block'/> favorito.",
  },
  bestSellers: {
    hero: {
      title: "BEST SELLERS",
      carouselImages: [
        {
          image: "/images/best-seller/hero.webp",
          color: "text-black",
        },
        {
          image: "/images/main/hero.webp",
          color: "text-white",
        },
        {
          image: "/images/fragances/men-hero.webp",
          color: "text-black",
        },
        {
          image: "/images/fragances/women-hero.webp",
          color: "text-white",
        },
        {
          image: "/images/clothes/men-hero.webp",
          color: "text-black",
        },
        {
          image: "/images/clothes/women-hero.webp",
          color: "text-white",
        },
      ],
      changeColor: true,
    },
    gridProducts: {
      title: "PRODUCTOS",
      filter1: "FILTROS",
      filter2: "ORDENAR POR",
    },
  },
  footer: {
    description: {
      title: "INSCRÍBETE PARA <br/> RECIBIR NOVEDADES ",
      name: "¿CUÁL ES TU NOMBRE?",
    },
    women: {
      title: "Mujeres",
      links: [
        { label: "FRAGANCIAS", href: "/fragrances/women" },
        { label: "ROPA", href: "/clothes/women" },
      ],
    },
    men: {
      title: "Hombres",
      links: [
        { label: "FRAGANCIAS", href: "/fragrances/men" },
        { label: "ROPA", href: "/clothes/men" },
      ],
    },
    bestseller: {
      title: "Best Sellers",
      links: [
        { label: "FRAGANCIAS", href: "/best-seller" },
        { label: "ROPA", href: "/best-seller" },
      ],
    },
    contact: {
      title: "Contáctanos",
      links: [
        { icon: "", label: "+ 609 899 3421", href: "tel:+6098993421" },
        { icon: "tiktok", label: "yovani.b1", href: "#" },
        { icon: "instagram", label: "@yovani.store", href: "#" },
      ],
    },
  },
};

export default content;
