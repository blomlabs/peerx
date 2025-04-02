import { validateFields, nexu } from "nexujs";
import authorize from "../middleware/auth.middleware";
import {
  createListing,
  getListings,
} from "../controllers/listings.controllers";

const ListingRoute = nexu.router;

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

ListingRoute.get("/all-listings", authorize, getListings);

export default ListingRoute;
