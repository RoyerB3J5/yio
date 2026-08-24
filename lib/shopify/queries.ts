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
      familiaOlfativa: metafield(
        namespace: "fragancia"
        key: "familia_olfativa"
      ) {
        value
      }
      descripcionNotas: metafield(
        namespace: "fragancia"
        key: "descripcion_notas"
      ) {
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

export const BEST_SELLER_PRODUCTS_QUERY = /* GraphQL */ `
  query BestSellerProducts($first: Int!, $after: String) {
    products(first: $first, after: $after, query: "tag:best-seller") {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const RECOMMENDED_CLOTHING_QUERY = /* GraphQL */ `
  query RecommendedClothing($first: Int!, $after: String) {
    products(first: $first, after: $after, query: "product_type:Clothing") {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const RECOMMENDED_FRAGRANCE_QUERY = /* GraphQL */ `
  query RecommendedFragrance($first: Int!, $after: String) {
    products(first: $first, after: $after, query: "product_type:Fragrance") {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              selectedOptions { name value }
              image { url altText }
              price { amount currencyCode }
              product { 
                title 
                handle
                tags
                productType
              }
            }
          }
        }
      }
    }
  }
`;

export const CART_CREATE = /* GraphQL */ `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_ADD = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_UPDATE = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_REMOVE = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_QUERY = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
  ${CART_FRAGMENT}
`;
