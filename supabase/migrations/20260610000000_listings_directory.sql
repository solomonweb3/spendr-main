-- Full Spendr directory: real companies that accept crypto
-- Categories: Stay, PrivateJet, Rental, Experience

truncate table listings restart identity cascade;

insert into listings (name, location, price, rating, reviews, image, tag, description, type, accepted_crypto) values

-- ─── PRIVATE AVIATION ──────────────────────────────────────────────────────

('VistaJet', 'Global', '$$$$', 4.9, 412, 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop', 'Popular', 'Global private aviation with guaranteed aircraft availability. Accepts Bitcoin and Ethereum for all charter bookings worldwide.', 'PrivateJet', ARRAY['BTC','ETH','USDC']),

('Wheels Up', 'United States', '$$$$', 4.8, 287, 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop', NULL, 'Membership-based private aviation across the US. King Air, Citation, and large cabin jets available with crypto payment options.', 'PrivateJet', ARRAY['BTC','ETH']),

('Paramount Business Jets', 'Global', '$$$$', 4.7, 198, 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&h=600&fit=crop', NULL, 'On-demand charter flights to over 40,000 airports globally. Accepts Bitcoin, Ethereum and USDC for instant booking.', 'PrivateJet', ARRAY['BTC','ETH','USDC']),

('Stratos Jets', 'United States', '$$$', 4.8, 156, 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&h=600&fit=crop', NULL, 'US private jet charter broker accepting Bitcoin since 2014. Turboprops, light jets, midsize and heavy cabin aircraft.', 'PrivateJet', ARRAY['BTC','ETH']),

('Air Charter Service', 'Global', '$$$$', 4.9, 534, 'https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=800&h=600&fit=crop', 'Verified', 'One of the world''s largest charter brokers. Private jets, helicopters, and cargo — all bookable with crypto.', 'PrivateJet', ARRAY['BTC','ETH','USDT']),

('Talon Air', 'New York, US', '$$$$', 5.0, 89, 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop', 'Guest Favourite', 'Ultra-luxury private aviation from New York. Gulfstream G550 and G650 charters. Bitcoin accepted.', 'PrivateJet', ARRAY['BTC','ETH']),

('Magellan Jets', 'Boston, US', '$$$', 4.7, 143, 'https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?w=800&h=600&fit=crop', NULL, 'Membership and on-demand private jet charter across North America. Crypto payments accepted at booking.', 'PrivateJet', ARRAY['BTC','USDC']),

('AirX Charter', 'Malta / Europe', '$$$$', 4.8, 112, 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop', NULL, 'European private jet charter operator. ACJ, BBJ, and business jets available with crypto settlement.', 'PrivateJet', ARRAY['BTC','ETH','USDT']),

('SimpleCharters', 'United States', '$$$', 4.6, 201, 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop', NULL, 'Transparent on-demand private jet charter. No membership required. Bitcoin and Ethereum accepted.', 'PrivateJet', ARRAY['BTC','ETH']),

('Bitjet', 'Global', '$$$$', 4.9, 78, 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&h=600&fit=crop', 'Crypto Native', 'The world''s first crypto-native private jet charter company. BTC, ETH, SOL, and USDC accepted natively — no conversion needed.', 'PrivateJet', ARRAY['BTC','ETH','SOL','USDC','USDT']),

-- ─── LUXURY STAYS ──────────────────────────────────────────────────────────

('Kessler Collection — Bohemian Hotel', 'Savannah, US', '$$$', 4.8, 312, 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop', 'Verified', 'Boutique luxury hotel in historic Savannah. Part of the Kessler Collection — one of the first hotel groups to accept Bitcoin.', 'Stay', ARRAY['BTC','ETH']),

('Kessler Collection — Beaver Creek Lodge', 'Colorado, US', '$$$', 4.9, 187, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', NULL, 'Ski-in ski-out luxury lodge in the Rockies. Full-service spa, fine dining, and crypto payments accepted at the front desk.', 'Stay', ARRAY['BTC','ETH']),

('Life House — Miami Beach', 'Miami, US', '$$', 4.7, 445, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop', 'Popular', 'Design-forward boutique hotel steps from South Beach. Life House accepts crypto across all its US properties.', 'Stay', ARRAY['BTC','ETH','USDC']),

('Thatch Caye Resort', 'Belize', '$$$$', 5.0, 134, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Guest Favourite', 'Private island resort in the Belize barrier reef. Overwater bungalows, diving, and Bitcoin accepted since 2015.', 'Stay', ARRAY['BTC']),

('Sanctuary Cap Cana', 'Dominican Republic', '$$$$', 4.9, 221, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop', NULL, 'Adults-only beachfront resort in the Dominican Republic. All-inclusive luxury with Bitcoin payment option.', 'Stay', ARRAY['BTC','USDT']),

('Karma Group — Karma Kandara', 'Bali, Indonesia', '$$$$', 4.8, 298, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop', 'Popular', 'Clifftop retreat above a secluded bay in Bali. Private beach, world-class spa. Crypto accepted across all Karma properties.', 'Stay', ARRAY['BTC','ETH','USDC']),

('Karma Group — Karma St. Martin', 'St. Martin, Caribbean', '$$$$', 4.9, 167, 'https://images.unsplash.com/photo-1540541338537-71cf90a1c226?w=800&h=600&fit=crop', NULL, 'Caribbean island villas with private pools and ocean views. Crypto accepted for all stays and experiences.', 'Stay', ARRAY['BTC','ETH','USDC']),

('The Satoshi House — Miami', 'Miami, US', '$$$$', 5.0, 56, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', 'Crypto Native', 'Ultra-luxury crypto-community villa in Miami. Bitcoin-only bookings. 6 bedrooms, rooftop pool, concierge.', 'Stay', ARRAY['BTC']),

('Newport Beach Villas', 'Newport Beach, US', '$$$', 4.8, 189, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', NULL, 'Curated oceanfront villas and estates in Newport Beach. Full concierge service. BTC, ETH and USDC accepted.', 'Stay', ARRAY['BTC','ETH','USDC']),

('1 Hotel Brooklyn Bridge', 'New York, US', '$$$', 4.7, 623, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop', 'Popular', 'Sustainable luxury hotel with panoramic Manhattan skyline views. Crypto payment available at check-in and online.', 'Stay', ARRAY['BTC','ETH']),

-- ─── EXOTIC CARS ───────────────────────────────────────────────────────────

('Gotham Dream Cars', 'New York / Miami, US', '$$$', 4.9, 834, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop', 'Popular', 'Exotic car rental with Ferraris, Lamborghinis, McLarens and more. NYC and Miami locations. Crypto accepted.', 'Rental', ARRAY['BTC','ETH','USDC']),

('BitDriven', 'London, UK', '$$$$', 4.8, 212, 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&h=600&fit=crop', 'Crypto Native', 'UK-based luxury and exotic car rental accepting only cryptocurrency. Lamborghini, Ferrari, Rolls-Royce and Bentley.', 'Rental', ARRAY['BTC','ETH','USDC','USDT']),

('Beverly Hills Rent A Car', 'Los Angeles, US', '$$$', 4.7, 567, 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop', NULL, 'Legendary LA exotic car rental. Ferraris, Lamborghinis, Rolls-Royces and more. Bitcoin and Ethereum accepted.', 'Rental', ARRAY['BTC','ETH']),

('Exotic Car Collection by Enterprise', 'Multiple US Cities', '$$$', 4.6, 1203, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop', NULL, 'Exotic and luxury car rentals at major US airports. Porsche, Maserati, Corvette. Crypto payments available at select locations.', 'Rental', ARRAY['BTC','ETH','USDC']),

('Dream Cars of Miami', 'Miami, US', '$$$', 4.9, 445, 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&h=600&fit=crop', 'Popular', 'Miami''s premier exotic car rental. Bugatti, Koenigsegg, Ferrari and McLaren available. Bitcoin accepted.', 'Rental', ARRAY['BTC','ETH','SOL']),

('Auto Exotic Rental', 'Miami / Fort Lauderdale, US', '$$$', 4.8, 378, 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop', NULL, 'South Florida''s top rated exotic rental. Lamborghini Urus, Ferrari Roma, Porsche GT3. Crypto accepted.', 'Rental', ARRAY['BTC','ETH','USDT']),

('Royalty Exotic Cars', 'Las Vegas, US', '$$$', 4.9, 921, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop', 'Guest Favourite', 'Las Vegas exotic car rental. Lamborghini, Ferrari, McLaren, Rolls-Royce. Daily and weekly crypto rentals available.', 'Rental', ARRAY['BTC','ETH','USDC','DOGE']),

('Prestige Luxury Rentals', 'Dubai, AE', '$$$$', 5.0, 312, 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&h=600&fit=crop', 'Verified', 'Dubai''s finest exotic car fleet. Bugatti Chiron, Lamborghini Aventador, Ferrari 812. Crypto widely accepted.', 'Rental', ARRAY['BTC','ETH','USDT','USDC']),

('Sixt Luxury Cars', 'Europe / US', '$$$', 4.6, 1876, 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop', NULL, 'Global car rental with a premium exotic fleet. Porsche, Mercedes AMG, BMW M Series. Crypto accepted in select markets.', 'Rental', ARRAY['BTC','ETH']),

('Token Rentals', 'Monaco', '$$$$', 4.9, 134, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop', 'Crypto Native', 'Monaco''s premier crypto-native exotic rental. Lamborghinis, Ferraris and Bentleys. Exclusively crypto payments.', 'Rental', ARRAY['BTC','ETH','USDC','SOL']),

-- ─── EXPERIENCES ───────────────────────────────────────────────────────────

('Burgess Yachts', 'Global', '$$$$', 4.9, 287, 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop', 'Verified', 'World-leading superyacht charter broker. Mediterranean, Caribbean and beyond. Crypto accepted for charter deposits and full payments.', 'Experience', ARRAY['BTC','ETH','USDC']),

('Fraser Yachts', 'Global', '$$$$', 4.8, 412, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop', NULL, 'Superyacht charters and sales worldwide. 40m+ yachts in the Mediterranean and Caribbean. Crypto payment available.', 'Experience', ARRAY['BTC','ETH']),

('Globetrotter Yacht Charters', 'Miami / Caribbean', '$$$', 4.9, 198, 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop', 'Popular', 'Luxury catamaran and motor yacht charters from Miami. Day trips to multi-week Caribbean voyages. BTC and ETH accepted.', 'Experience', ARRAY['BTC','ETH','SOL']),

('Nobu Restaurant — Miami Beach', 'Miami, US', '$$$', 4.8, 2341, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop', 'Popular', 'World-renowned Japanese-Peruvian cuisine by Nobu Matsuhisa. Miami Beach location accepts Bitcoin for dining and private events.', 'Experience', ARRAY['BTC']),

('Nusr-Et Steakhouse (Salt Bae)', 'Dubai / Miami / London', '$$$$', 4.5, 3421, 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop', 'Popular', 'Salt Bae''s iconic global steakhouse chain. Dubai, Miami, London and more. Bitcoin accepted at all locations.', 'Experience', ARRAY['BTC','ETH']),

('Blacklane Chauffeur', 'Global', '$$$', 4.8, 5621, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop', 'Verified', 'Professional chauffeur service in 50+ countries. Airport transfers, city rides, and long-distance travel. Crypto accepted.', 'Experience', ARRAY['BTC','ETH','USDC']),

('Exclusive Resorts', 'Global', '$$$$', 4.9, 312, 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop', NULL, 'Luxury destination club with 350+ residences across 100+ destinations. Members can now pay dues and bookings with crypto.', 'Experience', ARRAY['BTC','ETH','USDC']),

('Artisan Concierge', 'Miami / LA / NYC', '$$$$', 5.0, 89, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop', 'Crypto Native', 'Elite crypto-native concierge service. Private events, restaurant reservations, VIP access and bespoke travel planning. Crypto only.', 'Experience', ARRAY['BTC','ETH','SOL','USDC']),

('Secret Experiences', 'Global', '$$$', 4.8, 156, 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop', NULL, 'Curated access to private events, exclusive dining, and once-in-a-lifetime experiences. All bookable with crypto.', 'Experience', ARRAY['BTC','ETH','USDC','USDT']),

('Sundance Helicopter Tours', 'Las Vegas / Grand Canyon', '$$$', 4.9, 4231, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop', 'Popular', 'Iconic helicopter tours over the Grand Canyon and Las Vegas Strip. Bitcoin and crypto accepted for all tour bookings.', 'Experience', ARRAY['BTC','ETH']);
