CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    asset VARCHAR(50) NOT NULL,
    amount NUMERIC NOT NULL CHECK(amount >= 0) 
    price_per_unit DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'filled')),
    payment_methods TEXT[],
    minimum_limit NUMERIC NOT NULL CHECK (minimum_limit >= 0),
    maximum_limit NUMERIC NOT NULL CHECK (maximum_limit >= 0),
    description TEXT,
    listing_type VARCHAR(10) NOT NULL CHECK (listing_type IN ('buy', 'sell')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)


CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    type VARCHAR(10) NOT NULL CHECK (type IN ('buy', 'sell')),
    user_id INT NOT NULL, -- User who created the order
    counterparty_id INT, -- The other party involved in the trade
    amount NUMERIC NOT NULL CHECK (amount >= 0), -- Amount of currency being traded
    price_per_unit DECIMAL(10, 2) NOT NULL, -- Price per unit of the currency
    total_price DECIMAL(15, 2) GENERATED ALWAYS AS (amount * price_per_unit) STORED, -- Total price (calculated)
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')), -- Order status
    payment_method TEXT NOT NULL,
    currency_pair VARCHAR(200),
    listing_id INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiration_time TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    is_disputed BOOLEAN DEFAULT FALSE,
    dispute_reason TEXT,
)



CREATE TABLE escrows (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('listing', 'order')),
    user_id INT NOT NULL,
    listing_id INT,
    order_id INT,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'refunded', 'disputed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
