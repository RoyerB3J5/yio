const content = {
  header: {
    topContent: {
      paragraph: "Discover our Best Sellers",
      buttonLabel: "Go now",
    },
    fracancia: {
      title: "explore our <br/> fragrances",
      items: [
        { label: "Men", href: "/fragrances/men" },
        { label: "Women", href: "/fragrances/women" },
      ],
    },
    moda: {
      title: "find your style <br/> in every detail",
      items: [
        {
          title: "Clothing",
          list: [
            { label: "Men", href: "/clothes/men" },
            { label: "Women", href: "/clothes/women" },
          ],
        },
        {
          title: "Clothing",
          list: [
            { label: "Men", href: "/clothes/men" },
            { label: "Women", href: "/clothes/women" },
          ],
        },
        {
          title: "Clothing",
          list: [
            { label: "Men", href: "/clothes/men" },
            { label: "Women", href: "/clothes/women" },
          ],
        },
      ],
    },
    bestSellers: {
      title: "most sold by <br/> our customers",
      items: [
        { label: "Clothing", href: "/best-sellers" },
        { label: "Fragrances", href: "/best-sellers" },
      ],
      banner: {
        title: "BEST SELLERS",
        description: "Discover the most <br/> sold right now.",
        button: {
          label: "View more",
          href: "/best-sellers",
        },
      },
    },
    nav: [
      { label: "Fragrances", href: "#" },
      { label: "Fashion", href: "#" },
      { label: "Best Sellers", href: "#" },
    ],
    mobileContent: {
      label: "Most sold right now.",
      button: {
        label: "View more",
        href: "en/best-sellers",
      },
    },
    contact: {
      links: [
        { icon: "tiktok", label: "yovani.b1", href: "#" },
        { icon: "instagram", label: "@your.best.10", href: "https://www.instagram.com/your.best.10?igsi=MTg4OGlpcmc0Z284ZA==" },
      ],
    },
  },
  main: {
    hero: {
      title: "Online <br class='block md:hidden'/> Boutique",
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
      title: "Exclusive Fashion",
      buttons: [
        {
          label: "Women",
          href: "/clothes/women",
        },
        {
          label: "Men",
          href: "/clothes/men",
        },
      ],
    },
    categories: [
      {
        title: "fragrances",
        img: "fragance",
        href: "/fragrances/men",
        button: {
          label: "View more",
        },
      },
      {
        title: "fashion",
        img: "fashion",
        href: "/clothes/men",
        button: {
          label: "View more",
        },
      },
      {
        title: "lifestyle",
        img: "lifestyle",
        href: "/clothes/women",
        button: {
          label: "View more",
        },
      },
      {
        title: "best sellers",
        img: "best-seller",
        href: "/best-sellers",
        button: {
          label: "View more",
        },
      },
    ],
    collection: {
      title: "THE COLLECTION",
      description:
        "Discover curated pieces for those who value style and exclusivity.",
    },
    bestSeller: {
      title: "BEST SELLER",
      description: "What everyone is looking for.",
      category: [
        {
          name: "Women",
          href: "/best-sellers",
        },
        {
          name: "Men",
          href: "/best-sellers",
        },
      ],
      collections: [
        {
          image: "best-seller-1",
          name: "Express Your <br class='md:hidden'/>Essence",
          href: "/fragrances/men/santal-33",
          description:
            "Discreet, woody luxury that leaves <br class='hidden lg:block'/> an eternal mark",
          label: "View Now",
        },
        {
          image: "best-seller-2",
          name: "Minimalism That Commands",
          href: "/clothes/men/yoga-accolade-1-4-pullover",
          description:
            "Designed for those who understand that <br class='hidden lg:block'/> true luxury lies in the details.",
          label: "View Now",
        },
        {
          image: "best-seller-3",
          name: "Effortless Style",
          href: "/fragrances/men/bad-boy-elixir",
          description:
            "Sweet, dark, and provocative, seduction that <br class='hidden xl:block'/> breaks all the rules",
          label: "View Now",
        },
        {
          image: "best-seller-4",
          name: "Elevated Comfort",
          href: "/clothes/men/hoodies-essentials",
          description:
            "Versatile pieces that combine style, <br class='hidden lg:block'/> comfort and presence for any occasion.",
          label: "View Now",
        },
      ],
    },
    banners: [
      {
        title: "Lifestyle <br class='block md:hidden'/> Essentials",
        description:
          "Everything you need to complete your style, in one place.",
        button: {
          label: "VIEW LIFESTYLE",
          link: "clothes/women",
        },
      },
      {
        title: "Your scent, your <br class='block md:hidden'/> essence",
        description:
          "Find fragrances that leave a mark and turn every moment into something memorable.",
        button: {
          label: "View Fragrances",
          link: "fragrances/women",
        },
      },
      {
        title: "Everyone's <br class='block md:hidden'/> favorites",
        description:
          "Discover the most loved products and understand why they always come back for them.",
        button: {
          label: "View Best Sellers",
          link: "best-sellers",
        },
      },
      {
        title: "Elevate your <br class='block md:hidden'/> style",
        description:
          "Curated pieces to complement your look and highlight your personality.",
        button: {
          label: "View Fashion",
          link: "clothes/men",
        },
      },
    ],
  },
  productBanner: [
    {
      title: "Jean Paul Gaultier <br/>Le Male ",
      description:
        "Le Male, as virile as it is sexy, pays homage to the symbolic figure that has always inspired Jean Paul Gaultier: the sailor. This masculine perfume has a nonconformist vision of masculinity. Lavender, evoking the familiar and comforting scent of shaving foam, is enhanced by the sensuality of vanilla.",
      button: {
        label: "Buy",
        link: "/fragrances/men/le-male",
      },
      image: "/images/products/jean-paul.webp",
    },
    {
      title: "Dior <br/> sauvage ",
      description:
        "Sauvage has become an unmistakable name in the realm of men's perfume. Available in eau de toilette, eau de parfum, parfum —refillable— or elixir, Sauvage unfolds signature fragrances that combine freshness, power, and nobility.",
      button: {
        label: "Buy",
        link: "/fragrances/men/sauvage-eau-de-toilette",
      },
      image: "/images/products/dior-savage.webp",
    },
    {
      title: "alo <br/> Yoga Accolade hoodie ",
      description:
        "Everyone loves the Accolade collection. Our best-selling hoodie features a relaxed design with dropped shoulders for effortless style from the yoga studio to the street, an oversized kangaroo pocket, and comfortable ribbed cuffs and hem. It's crafted from mid-weight French terry with drape, soft on the outside and fleece-lined inside. Get the most out of it with the matching Accolade jogger. Find the perfect fit and discover all the ways to wear it.",
      button: {
        label: "Buy",
        link: "/clothes/women/yoga-accolade-hoodie",
      },
      image: "/images/products/alo-hoddie.webp",
    },
    {
      title: "Essentials <br/> hoodie  ",
      description:
        "Essentials hoodies (from the Fear of God brand) are premium urban garments. They stand out for their minimalist style, oversized fit, and thick fabric (brushed cotton). They offer maximum comfort and have become a very popular luxury staple.",
      button: {
        label: "Buy",
        link: "/clothes/men/hoodies-essentials",
      },
      image: "/images/products/essentials-hoddie.webp",
    },
  ],
  fragances: {
    men: {
      hero: {
        title: "Fragrances <br class='block lg:hidden'/> That Inspire ",
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
        title: "PRODUCTS",
        filter1: "FILTERS",
        filter2: "SORT BY",
        image1: "men-grid-1",
        image2: "men-grid-2",
      },
    },
    women: {
      hero: {
        title: "Fragrances <br class='block lg:hidden'/> That Inspire ",
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
        title: "PRODUCTS",
        filter1: "FILTERS",
        filter2: "SORT BY",
        image1: "women-grid-1",
      },
    },
  },
  individualFragrance: {
    button: "Buy now",
    recomendado:
      "Find your <br /> next <br class='hidden md:block'/> favorite.",
    tag: "TOP NOTES - HEART NOTES - BASE NOTES",
  },
  clothes: {
    men: {
      hero: {
        title: "EXCLUSIVE <br class='block md:hidden'/> FASHION",
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
        title: "PRODUCTS",
        filter1: "FILTERS",
        filter2: "SORT BY",
      },
    },
    women: {
      hero: {
        title: "EXCLUSIVE FASHION",
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
        title: "PRODUCTS",
        filter1: "FILTERS",
        filter2: "SORT BY",
      },
    },
  },
  individualClothes: {
    button: "Buy now",
    estilo: "Match Your Style",
    recomendado:
      "Find your <br /> next <br class='hidden md:block'/> favorite.",
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
      title: "PRODUCTS",
      filter1: "FILTERS",
      filter2: "SORT BY",
    },
  },
  footer: {
    description: {
      title: "SIGN UP TO <br/> RECEIVE UPDATES ",
      name: "WHAT'S YOUR NAME?",
    },
    women: {
      title: "Women",
      links: [
        { label: "FRAGRANCES", href: "/fragrances/women" },
        { label: "CLOTHING", href: "/clothes/women" },
      ],
    },
    men: {
      title: "Men",
      links: [
        { label: "FRAGRANCES", href: "/fragrances/men" },
        { label: "CLOTHING", href: "/clothes/men" },
      ],
    },
    bestseller: {
      title: "Best Sellers",
      links: [
        { label: "FRAGRANCES", href: "/best-seller" },
        { label: "CLOTHING", href: "/best-seller" },
      ],
    },
    contact: {
      title: "Contact Us",
      links: [
        { icon: "", label: "+ 609 899 3421", href: "tel:+6098993421" },
        { icon: "tiktok", label: "yovani.b1", href: "#" },
        { icon: "instagram", label: "@your.best.10", href: "https://www.instagram.com/your.best.10?igsi=MTg4OGlpcmc0Z284ZA==" },
      ],
    },
  },
};

export default content;
