// import React, { useEffect } from 'react';

// import {algoliasearch} from 'algoliasearch';
// import { useQuery } from "@tanstack/react-query";

// const INDEX_NAME = 'zzkc_006_dx__RefArch__products__en_US';
// const ALGOLIA_APP_ID = "7Z60MTP4D6";
// const ALGOLIA_SEARCH_API_KEY = "37c89e6da84c37aa739e4d1c3f696c74";

// const fetchRelatedProducts = async ({ primaryCategoryId }) => {
//   const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

//   const parts = primaryCategoryId.split("-");
//   const childCategory = parts[parts.length - 1]; 
//   const { hits } = await client.searchSingleIndex({
//     indexName: INDEX_NAME,
//     searchParams: {
//       query: childCategory,
//       hitsPerPage: 5,
//       distinct: true, 
//     },
//   });

//   return hits;
// };


// const useRelatedProducts = (primaryCategoryId) => {
//   return useQuery({
//     queryKey: ["relatedProducts", primaryCategoryId],
//     queryFn: () =>
//       fetchRelatedProducts({ primaryCategoryId }),
//     enabled: !!primaryCategoryId,
//   });
// };

// const RelatedProductsCustom = ({ primaryCategoryId, currentObjectID }) => {
//   const { data: relatedProducts, isLoading, isError } = useRelatedProducts(
//     primaryCategoryId,
//   );
//   console.log("primaryCategoryId",primaryCategoryId)
//   if (isLoading) return null;
//   else if (isError) {
//     console.error("Failed to load related products");
//     return null;
//   }
//   else if(relatedProducts?.length){
//     //UI for related items
//     return (
//         <>
//             {
//                 relatedProducts.map(hit=><h5>{hit.name}</h5>)
//             }
//         </>
//     )
//   }
//   return null;
// };

// export default RelatedProductsCustom;

// ---------------------------------------------------------------------
 
import React from "react";
import { algoliasearch } from "algoliasearch";
import { useQuery } from "@tanstack/react-query";

const INDEX_NAME = "zzkc_006_dx__RefArch__products__en_US";
const ALGOLIA_APP_ID = "7Z60MTP4D6";
const ALGOLIA_SEARCH_API_KEY = "37c89e6da84c37aa739e4d1c3f696c74";

const fetchRelatedProducts = async ({ primaryCategoryId }) => {
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

  const parts = primaryCategoryId.split("-");
  const childCategory = parts[parts.length - 1];

  const { hits } = await client.searchSingleIndex({
    indexName: INDEX_NAME,
    searchParams: {
      query: childCategory,
      hitsPerPage: 6,
      distinct: true,
    },
  });

  return hits;
};

const useRelatedProducts = (primaryCategoryId) => {
  return useQuery({
    queryKey: ["relatedProducts", primaryCategoryId],
    queryFn: () => fetchRelatedProducts({ primaryCategoryId }),
    enabled: !!primaryCategoryId,
  });
};

const RelatedProductsCustom = ({ primaryCategoryId }) => {
  const { data: relatedProducts, isLoading, isError } = useRelatedProducts(primaryCategoryId);

  if (isLoading) return null;
  if (isError) {
    console.error("Failed to load related products");
    return null;
  }
  if (!relatedProducts?.length) return null;

  return (
    <section className="mt-10 mb-16">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Related Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((hit) => {
          // Extract price safely
          const priceUSD =
            hit?.price?.USD && !isNaN(hit.price.USD)
              ? `$${hit.price.USD.toFixed(2)}`
              : "Price not available";

          // Extract first available large image
          const imageUrl =
            hit?.image_groups?.find((g) => g.view_type === "large")?.images?.[0]?.dis_base_link ||
            hit?.image_groups?.[0]?.images?.[0]?.dis_base_link ||
            "/placeholder.png";

          return (
            <a
              key={hit.objectID}
              href={`/product/${hit.objectID}`}
              className="block border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <img
                src={imageUrl}
                alt={hit.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{hit.name}</h3>
                <p className="text-blue-600 font-semibold mt-2">{priceUSD}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProductsCustom;


