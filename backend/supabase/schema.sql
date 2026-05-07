create extension if not exists pgcrypto;

create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null unique,
    password text not null,
    campus text not null check (
        campus in (
            'Pulchowk Campus',
            'Thapathali Campus',
            'Paschimanchal Campus',
            'Purwanchal Campus',
            'Chitwan Engineering Campus',
            'Dharan Engineering Campus'
        )
    ),
    department text not null check (
        department in (
            'Computer',
            'Civil',
            'Electronics',
            'Mechanical',
            'Electrical',
            'Architecture',
            'Industrial',
            'Aerospace'
        )
    ),
    semester integer not null check (semester between 1 and 8),
    avatar text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.books (
    id uuid primary key default gen_random_uuid(),
    title text not null check (char_length(title) <= 200),
    subject text not null,
    author text not null,
    semester integer not null check (semester between 1 and 8),
    department text not null check (
        department in (
            'Computer',
            'Civil',
            'Electronics',
            'Mechanical',
            'Electrical',
            'Architecture',
            'Industrial',
            'Aerospace'
        )
    ),
    condition text not null check (condition in ('New', 'Good', 'Used')),
    price numeric not null check (price >= 0),
    image_url text not null default '',
    image_public_id text not null default '',
    description text check (char_length(description) <= 1000),
    seller uuid not null references public.users(id) on delete cascade,
    seller_name text not null,
    seller_email text not null,
    campus text not null,
    sold boolean not null default false,
    contact_info text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.wishlists (
    user_id uuid not null references public.users(id) on delete cascade,
    book_id uuid not null references public.books(id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (user_id, book_id)
);

create index if not exists books_semester_idx on public.books (semester);
create index if not exists books_department_idx on public.books (department);
create index if not exists books_condition_idx on public.books (condition);
create index if not exists books_sold_idx on public.books (sold);
create index if not exists books_seller_idx on public.books (seller);
create index if not exists books_price_idx on public.books (price);

alter table public.users enable row level security;
alter table public.books enable row level security;
alter table public.wishlists enable row level security;
