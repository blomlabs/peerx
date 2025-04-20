import { assets } from "../utils/enums";
import { neonClient, query } from "../config/neon-client";
import { RequestError as Err, ZoltraHandler } from "zoltra";
import { throwIfInvalid } from "../utils/global";

export const createListing: ZoltraHandler = async (req, res, next) => {
  try {
    const {
      asset,
      amount,
      price_per_unit,
      //   payment_method,
      minimum_limit,
      maximum_limit,
      listing_type,
      description,
    } = req.body;

    const currency = asset.toLowerCase() as never;

    throwIfInvalid(
      req.user.balance[currency] < amount,
      `Insufficent ${asset} balance to create listing`,
      "ListingError"
    );

    throwIfInvalid(
      !assets.includes(asset),
      "Please select a vaild asset",
      "ListingError"
    );

    throwIfInvalid(
      price_per_unit < 50,
      "Price per unit must be greater than 50",
      "ListingError"
    );

    throwIfInvalid(
      minimum_limit < 1500,
      "Minimum limit should not be lower than 1500",
      "ListingError"
    );

    const remaining_user_bal = req.user.balance[currency] - amount;

    const listing = await query(
      `INSERT INTO listings (user_id, asset, amount, price_per_unit, minimum_limit, maximum_limit, listing_type, status, description)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id, user_id, asset, amount, price_per_unit, minimum_limit, maximum_limit, listing_type, status, description, created_at
        `,
      [
        req.user.id,
        asset,
        amount,
        price_per_unit,
        minimum_limit,
        maximum_limit,
        listing_type,
        "active",
        description,
      ]
    );

    await query(
      "INSERT INTO escrows (type, user_id, listing_id, amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      ["listing", req.user.id, listing[0].id, amount, "pending"]
    );

    await query(
      `
         UPDATE users
         SET balance = jsonb_set(balance, $1, $2)
        WHERE id = $3
        `,
      [`{${currency}}`, remaining_user_bal, req.user.id]
    );

    const order = {
      id: listing[0].id,
      asset: listing[0].asset,
      amount: listing[0].amount + " " + listing[0].asset,
      limit: `${listing[0].minimum_limit} - ${listing[0].maximum_limit} NGN`,
      type: listing[0].listing_type,
    };

    res.status(200).json({
      success: true,
      message: "Listing successfully created",
      order,
      data: listing[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getListings: ZoltraHandler = async (req, res, next) => {
  try {
    const listings = await neonClient.useQueryLimit({
      req,
      table: "listings",
      columns: [
        "id",
        "user_id",
        "asset",
        "amount",
        "price_per_unit",
        "minimum_limit",
        "maximum_limit",
        "listing_type",
        "status",
        "description",
        "created_at",
      ],
    });

    if (listings.length === 0) {
      const error = new Err("No listing is found", "FetchError");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "",
      length: listings.length,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};
