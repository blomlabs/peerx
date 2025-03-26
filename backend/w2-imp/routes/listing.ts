import { nexuRouter, validateFields } from "nexujs";
import authorize from "../middleware/auth.middleware";
import { createListing } from "../controllers/listings.controllers";

const ListingRoute = nexuRouter;

ListingRoute.post(
  "/create-listing",
  validateFields([
    "asset",
    "amount",
    "price_per_unit",
    "minimum_limit",
    "maximum_limit",
    "listing_type",
  ]),
  authorize,
  createListing
);

export default ListingRoute;
