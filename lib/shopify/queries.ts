export const COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  query CollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      handle
      title
      products(first: $first, after: $after) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }

  fragment ProductCard on Product {
    id
    handle
    title
    vendor
    createdAt
    tags
    featuredImage {
      url
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    volumen: metafield(namespace: "fragancia", key: "volumen") {
      value
    }
    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

export const FRAGRANCE_PRODUCT_QUERY = /* GraphQL */ `
  query FragranceProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      vendor
      createdAt
      tags
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
      volumen: metafield(namespace: "fragancia", key: "volumen") {
        value
      }
      tagline: metafield(namespace: "fragancia", key: "tagline") {
        value
      }
      notaAlta: metafield(namespace: "fragancia", key: "nota_alta") {
        value
      }
      notaCorazon: metafield(namespace: "fragancia", key: "nota_corazon") {
        value
      }
      notaBase: metafield(namespace: "fragancia", key: "nota_base") {
        value
      }
      familiaOlfativa: metafield(namespace: "fragancia", key: "familia_olfativa") {
        value
      }
      descripcionNotas: metafield(namespace: "fragancia", key: "descripcion_notas") {
        value
      }
    }
  }
`;

export const CLOTHING_PRODUCT_QUERY = /* GraphQL */ `
  query ClothingProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      vendor
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
      longDescription: metafield(namespace: "ropa", key: "long_description") {
        value
      }
      fit: metafield(namespace: "ropa", key: "fit") {
        value
      }
      manufacturing: metafield(namespace: "ropa", key: "manufacturing") {
        value
      }
      relatedProducts: metafield(namespace: "ropa", key: "related_products") {
        references(first: 10) {
          nodes {
            ... on Product {
              id
              handle
              title
              vendor
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
