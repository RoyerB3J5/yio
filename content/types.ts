export type HeaderContent = {
  topContent: {
    paragraph: string;
    buttonLabel: string;
  };
  fracancia: {
    title: string;
    items: Array<{ label: string; href: string }>;
  };
  moda: {
    title: string;
    items: Array<{
      title: string;
      list: Array<{ label: string; href: string }>;
    }>;
  };
  bestSellers: {
    title: string;
    items: Array<{ label: string; href: string }>;
    banner: {
      title: string;
      description: string;
      button: { label: string; href: string };
    };
  };
  nav: Array<{ label: string; href: string }>;
  mobileContent: {
    label: string;
    button: { label: string; href: string };
  };
  contact: {
    links: Array<{ icon: string; label: string; href: string }>;
  };
};

export type FooterContent = {
  description: {
    title: string;
    name: string;
  };
  women: {
    title: string;
    links: Array<{ label: string; href: string }>;
  };
  men: {
    title: string;
    links: Array<{ label: string; href: string }>;
  };
  bestseller: {
    title: string;
    links: Array<{ label: string; href: string }>;
  };
  contact: {
    title: string;
    links: Array<{ icon: string; label: string; href: string }>;
  };
};

export type Content = {
  header: HeaderContent;
  footer: FooterContent;
};