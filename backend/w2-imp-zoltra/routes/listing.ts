import { defineRoutes } from "zoltra";
import {
  createListing,
  getListings,
} from "../controllers/listings.controllers";
import validateFields from "../middleware/vaildateFields";
import authorize from "../middleware/auth.middleware";

export const routes = defineRoutes([
  {
    method: "POST",
    path: "/v1/listings/create-listing",
    handler: createListing,
    middleware: [
      validateFields([
        "asset",
        "amount",
        "price_per_unit",
        "minimum_limit",
        "maximum_limit",
        "listing_type",
      ]),
      authorize,
    ],
  },
  {
    method: "GET",
    path: "/v1/listings",
    handler: getListings,
    middleware: [authorize],
  },
]);
