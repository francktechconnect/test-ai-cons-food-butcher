-- Reference production data model ONLY: NOT executed or wired into the prototype.
-- Review security, migrations, regulatory data requirements, and concurrency before use.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE merchants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  name text NOT NULL, address text, timezone text NOT NULL DEFAULT 'America/Moncton',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE staff_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  auth_subject text NOT NULL UNIQUE, email text NOT NULL,
  role text NOT NULL CHECK (role IN ('owner','manager','butcher','counter','viewer')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  name text NOT NULL, email text, phone text, language text NOT NULL DEFAULT 'en'
    CHECK (language IN ('en','fr')),
  notes text, marketing_consent_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id, merchant_id)
);
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  sku text NOT NULL, name_en text NOT NULL, name_fr text, category text,
  unit text NOT NULL CHECK (unit IN ('kg','lb','piece','pack')),
  price_cad numeric(12,2) NOT NULL CHECK (price_cad >= 0),
  active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(merchant_id,sku), UNIQUE(id,merchant_id)
);
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  location_id uuid NOT NULL REFERENCES locations(id), customer_id uuid NOT NULL,
  external_ref text NOT NULL, channel text NOT NULL CHECK (channel IN ('online','phone','counter','message')),
  status text NOT NULL DEFAULT 'new' CHECK(status IN ('new','confirmed','preparing','ready','completed','cancelled')),
  pickup_at timestamptz, notes text, deposit_cad numeric(12,2) NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'unpaid' CHECK(payment_status IN ('unpaid','deposit','paid')),
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  version bigint NOT NULL DEFAULT 1,
  UNIQUE(merchant_id, external_ref), UNIQUE(id, merchant_id),
  FOREIGN KEY (customer_id,merchant_id) REFERENCES customers(id,merchant_id)
);
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  order_id uuid NOT NULL, product_id uuid NOT NULL,
  requested_quantity numeric(12,3) NOT NULL CHECK (requested_quantity > 0),
  actual_quantity numeric(12,3) CHECK (actual_quantity > 0),
  unit text NOT NULL CHECK(unit IN ('kg','lb','piece','pack')),
  unit_price_snapshot_cad numeric(12,2) NOT NULL CHECK (unit_price_snapshot_cad >= 0),
  cut_options jsonb NOT NULL DEFAULT '{}'::jsonb,
  FOREIGN KEY(order_id,merchant_id) REFERENCES orders(id,merchant_id),
  FOREIGN KEY(product_id,merchant_id) REFERENCES products(id,merchant_id)
);
CREATE TABLE inventory_lots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  location_id uuid NOT NULL REFERENCES locations(id), product_id uuid NOT NULL,
  lot_code text, supplier_ref text, received_at timestamptz,
  best_before date, quantity_available numeric(14,3) NOT NULL DEFAULT 0,
  FOREIGN KEY(product_id,merchant_id) REFERENCES products(id,merchant_id)
);
CREATE TABLE inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  lot_id uuid NOT NULL REFERENCES inventory_lots(id), order_id uuid REFERENCES orders(id),
  change_quantity numeric(14,3) NOT NULL, reason text NOT NULL,
  actor_id uuid REFERENCES staff_users(id), recorded_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  order_id uuid NOT NULL REFERENCES orders(id), provider text, provider_event_id text,
  event_type text NOT NULL, amount_cad numeric(12,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider, provider_event_id)
);
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  order_id uuid REFERENCES orders(id), customer_id uuid REFERENCES customers(id),
  channel text NOT NULL CHECK(channel IN ('sms','email')),
  type text NOT NULL, language text NOT NULL CHECK(language IN ('en','fr')),
  status text NOT NULL DEFAULT 'queued', provider_id text,
  message text, created_at timestamptz NOT NULL DEFAULT now(), sent_at timestamptz
);
CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), merchant_id uuid NOT NULL REFERENCES merchants(id),
  actor_subject text, record_type text NOT NULL, record_id uuid NOT NULL,
  operation text NOT NULL, before_data jsonb, after_data jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_orders_merchant_status_date ON orders(merchant_id, status, created_at DESC);
CREATE INDEX idx_orders_merchant_customer ON orders(merchant_id,customer_id,created_at DESC);
CREATE INDEX idx_notifications_merchant_order ON notifications(merchant_id,order_id,created_at DESC);
CREATE INDEX idx_inventory_lots_merchant_product ON inventory_lots(merchant_id,product_id);
CREATE INDEX idx_audit_merchant_record ON audit_events(merchant_id,record_type,record_id,created_at DESC);
-- Additional tenant checks, row-level security policies, audit immutability, and migrations REQUIRED.
