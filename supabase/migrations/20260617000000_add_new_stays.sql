-- New luxury stays: Nightfall Group, LVH Global, MAK Vacation Rentals, Villaway, Dtravel

insert into listings (name, location, price, rating, reviews, image, tag, description, type, accepted_crypto) values

('The Nightfall Group', 'Los Angeles, CA', '$$$$', 4.9, 64, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=680&fit=crop&q=90', 'Crypto Native', 'Boutique ultra-high-end villa and estate concierge based in Beverly Hills. Curated mansions across Beverly Hills, Bel Air, West Hollywood, Hollywood Hills and Malibu — plus Miami Beach. Crypto payments accepted publicly since 2024. Available 24/7.', 'Stay', ARRAY['BTC','ETH','USDC','USDT']),

('LVH Global', 'Los Angeles, CA', '$$$$', 4.9, 312, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=680&fit=crop&q=90', 'Verified', 'Ultra-luxury vacation home platform with 3,500+ signature homes across 37 global destinations. Strong LA, Malibu, NYC and Hamptons inventory. UHNW clientele, staffed villas, full concierge. One of the first in the luxury vacation home industry to accept Bitcoin, announced at the Bitcoin Conference 2021.', 'Stay', ARRAY['BTC']),

('MAK Vacation Rentals', 'Miami, FL', '$$$', 4.8, 178, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&h=680&fit=crop&q=90', 'Crypto Discount', 'Miami Beach luxury short-term rentals and boutique Airbnb-style properties. Also operates in New York and Cancun. Explicitly accepts crypto and offers crypto discounts on luxury suites — one of the most crypto-forward short-term rental operators in the market.', 'Stay', ARRAY['BTC','ETH','USDC','USDT']),

('Villaway', 'Los Angeles, CA', '$$$$', 4.9, 203, 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&h=680&fit=crop&q=90', 'Popular', 'The world''s most trusted marketplace for luxury vacation homes. Handpicked Beverly Hills and Malibu villas, concierge-backed. Strong LA inventory with national and international reach. Crypto payments enabled as part of their AI-enhanced marketplace launch.', 'Stay', ARRAY['BTC','ETH','USDC']),

('Dtravel', 'Los Angeles, CA', '$$$', 4.8, 421, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&h=680&fit=crop&q=90', 'Crypto Native', 'Web3-native short-term rental marketplace — the closest thing to a crypto-native Airbnb. Hosts list directly, guests book via smart contracts with no OTA fees. Growing US inventory across LA, Miami and NYC. Also integrated with Travala.com for access to 2.2M+ properties bookable with 100+ cryptos.', 'Stay', ARRAY['ETH','USDC','USDT']);
