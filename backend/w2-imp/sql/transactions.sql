CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('withdrawal', 'deposit')), 
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    receiver_address TEXT,
    sender_address TEXT,
    currency VARCHAR(200),
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    reference_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)

CREATE TABLE ledger (
    id SERIAL PRIMARY KEY,
    transaction_id INT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    user_address TEXT NOT NULL,
    entry_type VARCHAR(10) NOT NULL CHECK (entry_type IN ('debit', 'credit')),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('transfer', 'p2p'))
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    balance_after_transaction NUMERIC NOT NULL,
    currency VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
