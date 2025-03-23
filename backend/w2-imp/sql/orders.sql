CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    type VARCHAR(10) NOT NULL CHECK (type IN ('buy', 'sell')),
    user_id INT NOT NULL, -- User who created the order
    counterparty_id INT, -- The other party involved in the trade
    amount NUMERIC NOT NULL CHECK (amount >= 0), -- Amount of currency being traded
    price_per_unit DECIMAL(10, 2) NOT NULL, -- Price per unit of the currency
    total_price DECIMAL(15, 2) GENERATED ALWAYS AS (amount * price_per_unit) STORED, -- Total price (calculated)
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')), -- Order status
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('bank_transfer', 'wallet')),
    currency_pair VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expiration_time TIMESTAMP
)