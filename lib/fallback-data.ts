import { Product, Category } from './types';

export const FALLBACK_CATEGORIES: Category[] = [
  {
    "_id": "cat_3d-digital-art",
    "name": "3D & Digital Art",
    "slug": "3d-digital-art",
    "description": "Hyper-detailed 3D models, procedural meshes, and renders",
    "icon": "Boxes"
  },
  {
    "_id": "cat_fine-art",
    "name": "Fine Art & Collectibles",
    "slug": "fine-art",
    "description": "Exclusive digital paintings, cubist portraits, and generative pieces",
    "icon": "Palette"
  },
  {
    "_id": "cat_ui-ux-templates",
    "name": "UI/UX & Templates",
    "slug": "ui-ux-templates",
    "description": "Production-ready component libraries, wireframes, and vector kits",
    "icon": "Layout"
  },
  {
    "_id": "cat_game-assets",
    "name": "Game Assets & Pixels",
    "slug": "game-assets",
    "description": "Pixel art sprites, characters, textures, and environmental props",
    "icon": "Gamepad2"
  },
  {
    "_id": "cat_illustrations",
    "name": "Illustrations & Concept",
    "slug": "illustrations",
    "description": "Atmospheric landscapes, cyberpunk scenes, and vector graphics",
    "icon": "Sparkles"
  },
  {
    "_id": "cat_textures-graphics",
    "name": "Textures & Graphics",
    "slug": "textures-graphics",
    "description": "High-resolution marble backdrops, abstract overlays, and patterns",
    "icon": "Image"
  }
];

export const FALLBACK_PRODUCTS: Product[] = [
  {
    "_id": "prod_cosmic-singularity-orb-01",
    "title": "Cosmic Singularity Orb #01",
    "slug": "cosmic-singularity-orb-01",
    "description": "High-fidelity procedural raymarched energy sphere with volumetric plasma shaders.",
    "category": "3d-digital-art",
    "subcategory": "3D Render",
    "coverImageUrl": "/market-place images/01_cosmic_orb_1.png",
    "previewImages": [
      "/market-place images/01_cosmic_orb_1.png"
    ],
    "priceUsdc": 35,
    "priceBaseUnits": 35000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 15,
    "salesCount": 0,
    "tags": [
      "3D",
      "Cosmic",
      "Orb",
      "Procedural"
    ],
    "isFeatured": true,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_cubist-persona-alpha",
    "title": "Cubist Persona Alpha",
    "slug": "cubist-persona-alpha",
    "description": "Modern neo-cubist expressionist portrait exploring multidimensional digital identity.",
    "category": "fine-art",
    "subcategory": "Digital Painting",
    "coverImageUrl": "/market-place images/01_cubist_face_1.jpg",
    "previewImages": [
      "/market-place images/01_cubist_face_1.jpg"
    ],
    "priceUsdc": 45,
    "priceBaseUnits": 45000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 22,
    "salesCount": 3,
    "tags": [
      "Art",
      "Cubism",
      "NFT",
      "Portrait"
    ],
    "isFeatured": true,
    "isTrending": true,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_cubist-persona-beta",
    "title": "Cubist Persona Beta",
    "slug": "cubist-persona-beta",
    "description": "Structured geometric facial planes with textured acrylic rendering overlays.",
    "category": "fine-art",
    "subcategory": "Digital Painting",
    "coverImageUrl": "/market-place images/02_cubist_face_2.jpg",
    "previewImages": [
      "/market-place images/02_cubist_face_2.jpg"
    ],
    "priceUsdc": 45,
    "priceBaseUnits": 45000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 29,
    "salesCount": 6,
    "tags": [
      "Art",
      "Cubism",
      "Geometric"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_cubist-persona-gamma",
    "title": "Cubist Persona Gamma",
    "slug": "cubist-persona-gamma",
    "description": "Deconstructed expressive portrait blending warm earth tones and harsh angles.",
    "category": "fine-art",
    "subcategory": "Digital Painting",
    "coverImageUrl": "/market-place images/03_cubist_face_3.jpg",
    "previewImages": [
      "/market-place images/03_cubist_face_3.jpg"
    ],
    "priceUsdc": 50,
    "priceBaseUnits": 50000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 36,
    "salesCount": 9,
    "tags": [
      "Art",
      "Expressionism",
      "Cubist"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_tall-ship-odyssey-i",
    "title": "Tall Ship Odyssey I",
    "slug": "tall-ship-odyssey-i",
    "description": "Gouache-style maritime vessel navigating cresting emerald ocean swells.",
    "category": "illustrations",
    "subcategory": "Marine Art",
    "coverImageUrl": "/market-place images/04_tall_ship_1.jpg",
    "previewImages": [
      "/market-place images/04_tall_ship_1.jpg"
    ],
    "priceUsdc": 28,
    "priceBaseUnits": 28000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 43,
    "salesCount": 12,
    "tags": [
      "Illustration",
      "Maritime",
      "Ship",
      "Ocean"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_celestial-core-v",
    "title": "Celestial Core V",
    "slug": "celestial-core-v",
    "description": "Multi-layered refraction orb featuring iridescent crystal core dynamics.",
    "category": "3d-digital-art",
    "subcategory": "3D Render",
    "coverImageUrl": "/market-place images/05_cosmic_orb_5.png",
    "previewImages": [
      "/market-place images/05_cosmic_orb_5.png"
    ],
    "priceUsdc": 38,
    "priceBaseUnits": 38000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 50,
    "salesCount": 15,
    "tags": [
      "3D",
      "Refraction",
      "Core"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_tall-ship-odyssey-ii",
    "title": "Tall Ship Odyssey II",
    "slug": "tall-ship-odyssey-ii",
    "description": "Dramatic twilight seascape featuring rigged galleon cutting through fog.",
    "category": "illustrations",
    "subcategory": "Marine Art",
    "coverImageUrl": "/market-place images/05_tall_ship_2.jpg",
    "previewImages": [
      "/market-place images/05_tall_ship_2.jpg"
    ],
    "priceUsdc": 28,
    "priceBaseUnits": 28000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 57,
    "salesCount": 18,
    "tags": [
      "Illustration",
      "Galleon",
      "Twilight"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_pixel-critter-01-glitch-fox",
    "title": "Pixel Critter #01 (Glitch Fox)",
    "slug": "pixel-critter-01-glitch-fox",
    "description": "Handcrafted 32x32 retro arcade sprite with animated walk, run, and attack frames.",
    "category": "game-assets",
    "subcategory": "Sprites",
    "coverImageUrl": "/market-place images/06_pixel_critter_1.png",
    "previewImages": [
      "/market-place images/06_pixel_critter_1.png"
    ],
    "priceUsdc": 15,
    "priceBaseUnits": 15000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Pixel Forge",
    "creatorUsername": "pixel_forge",
    "creatorAvatar": "/market-place images/06_pixel_critter_1.png",
    "likesCount": 64,
    "salesCount": 21,
    "tags": [
      "PixelArt",
      "GameDev",
      "Sprite",
      "Fox"
    ],
    "isFeatured": true,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_tall-ship-odyssey-iii",
    "title": "Tall Ship Odyssey III",
    "slug": "tall-ship-odyssey-iii",
    "description": "Golden hour maritime study with hand-rendered canvas texture and sail detail.",
    "category": "illustrations",
    "subcategory": "Marine Art",
    "coverImageUrl": "/market-place images/06_tall_ship_3.jpg",
    "previewImages": [
      "/market-place images/06_tall_ship_3.jpg"
    ],
    "priceUsdc": 32,
    "priceBaseUnits": 32000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 71,
    "salesCount": 0,
    "tags": [
      "Maritime",
      "Canvas",
      "Historical"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_liquid-marble-swirl-i",
    "title": "Liquid Marble Swirl I",
    "slug": "liquid-marble-swirl-i",
    "description": "Ultra-high resolution 8K fluid marbling background with metallic gold accents.",
    "category": "textures-graphics",
    "subcategory": "Textures",
    "coverImageUrl": "/market-place images/07_marble_painting_1.jpg",
    "previewImages": [
      "/market-place images/07_marble_painting_1.jpg"
    ],
    "priceUsdc": 20,
    "priceBaseUnits": 20000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 78,
    "salesCount": 3,
    "tags": [
      "Texture",
      "Marble",
      "Fluid",
      "8K"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_pixel-critter-02-aqua-toad",
    "title": "Pixel Critter #02 (Aqua Toad)",
    "slug": "pixel-critter-02-aqua-toad",
    "description": "Amphibian game companion with vibrant cyan and violet neon palette.",
    "category": "game-assets",
    "subcategory": "Sprites",
    "coverImageUrl": "/market-place images/07_pixel_critter_2.png",
    "previewImages": [
      "/market-place images/07_pixel_critter_2.png"
    ],
    "priceUsdc": 15,
    "priceBaseUnits": 15000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Pixel Forge",
    "creatorUsername": "pixel_forge",
    "creatorAvatar": "/market-place images/06_pixel_critter_1.png",
    "likesCount": 85,
    "salesCount": 6,
    "tags": [
      "PixelArt",
      "Creature",
      "Retro"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_liquid-marble-swirl-ii",
    "title": "Liquid Marble Swirl II",
    "slug": "liquid-marble-swirl-ii",
    "description": "Deep cobalt and mineral quartz flowing liquid marbling pattern.",
    "category": "textures-graphics",
    "subcategory": "Textures",
    "coverImageUrl": "/market-place images/08_marble_painting_2.jpg",
    "previewImages": [
      "/market-place images/08_marble_painting_2.jpg"
    ],
    "priceUsdc": 20,
    "priceBaseUnits": 20000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 92,
    "salesCount": 9,
    "tags": [
      "Marble",
      "Cobalt",
      "Abstract"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_pixel-critter-03-chrono-bot",
    "title": "Pixel Critter #03 (Chrono Bot)",
    "slug": "pixel-critter-03-chrono-bot",
    "description": "Cybernetic automaton companion sprite with time-bending energy trails.",
    "category": "game-assets",
    "subcategory": "Sprites",
    "coverImageUrl": "/market-place images/08_pixel_critter_3.png",
    "previewImages": [
      "/market-place images/08_pixel_critter_3.png"
    ],
    "priceUsdc": 18,
    "priceBaseUnits": 18000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Pixel Forge",
    "creatorUsername": "pixel_forge",
    "creatorAvatar": "/market-place images/06_pixel_critter_1.png",
    "likesCount": 99,
    "salesCount": 12,
    "tags": [
      "PixelArt",
      "Mecha",
      "Bot"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_liquid-marble-swirl-iii",
    "title": "Liquid Marble Swirl III",
    "slug": "liquid-marble-swirl-iii",
    "description": "Smoky onyx and alabaster swirl backdrop ideal for luxury branding and packaging.",
    "category": "textures-graphics",
    "subcategory": "Textures",
    "coverImageUrl": "/market-place images/09_marble_painting_3.jpg",
    "previewImages": [
      "/market-place images/09_marble_painting_3.jpg"
    ],
    "priceUsdc": 22,
    "priceBaseUnits": 22000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 21,
    "salesCount": 15,
    "tags": [
      "Marble",
      "Luxury",
      "Texture"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_pixel-critter-04-solar-drake",
    "title": "Pixel Critter #04 (Solar Drake)",
    "slug": "pixel-critter-04-solar-drake",
    "description": "Miniature dragon pet sprite with fire-breathing animation sheets.",
    "category": "game-assets",
    "subcategory": "Sprites",
    "coverImageUrl": "/market-place images/09_pixel_critter_4.png",
    "previewImages": [
      "/market-place images/09_pixel_critter_4.png"
    ],
    "priceUsdc": 18,
    "priceBaseUnits": 18000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Pixel Forge",
    "creatorUsername": "pixel_forge",
    "creatorAvatar": "/market-place images/06_pixel_critter_1.png",
    "likesCount": 28,
    "salesCount": 18,
    "tags": [
      "PixelArt",
      "Dragon",
      "Fantasy"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_prism-mask-identity-i",
    "title": "Prism Mask Identity I",
    "slug": "prism-mask-identity-i",
    "description": "Avant-garde 3D sculpted mask exploring human biometric abstraction.",
    "category": "3d-digital-art",
    "subcategory": "Sculpture",
    "coverImageUrl": "/market-place images/10_geometric_mask_1.jpg",
    "previewImages": [
      "/market-place images/10_geometric_mask_1.jpg"
    ],
    "priceUsdc": 40,
    "priceBaseUnits": 40000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 35,
    "salesCount": 21,
    "tags": [
      "3D",
      "Mask",
      "Sculpture",
      "NFT"
    ],
    "isFeatured": false,
    "isTrending": true,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_pixel-critter-05-void-phantom",
    "title": "Pixel Critter #05 (Void Phantom)",
    "slug": "pixel-critter-05-void-phantom",
    "description": "Spectral void entity with translucent glowing particle aura.",
    "category": "game-assets",
    "subcategory": "Sprites",
    "coverImageUrl": "/market-place images/10_pixel_critter_5.png",
    "previewImages": [
      "/market-place images/10_pixel_critter_5.png"
    ],
    "priceUsdc": 20,
    "priceBaseUnits": 20000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Pixel Forge",
    "creatorUsername": "pixel_forge",
    "creatorAvatar": "/market-place images/06_pixel_critter_1.png",
    "likesCount": 42,
    "salesCount": 0,
    "tags": [
      "PixelArt",
      "Phantom",
      "Boss"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_algorithmic-vector-grid-alpha",
    "title": "Algorithmic Vector Grid Alpha",
    "slug": "algorithmic-vector-grid-alpha",
    "description": "Precision SVG/EPS geometric grid system with modular layout guides.",
    "category": "ui-ux-templates",
    "subcategory": "Design Systems",
    "coverImageUrl": "/market-place images/11_geo_pattern_1.png",
    "previewImages": [
      "/market-place images/11_geo_pattern_1.png"
    ],
    "priceUsdc": 25,
    "priceBaseUnits": 25000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "extended",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 49,
    "salesCount": 3,
    "tags": [
      "Vector",
      "Grid",
      "UI",
      "DesignSystem"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_prism-mask-identity-ii",
    "title": "Prism Mask Identity II",
    "slug": "prism-mask-identity-ii",
    "description": "Reflective porcelain and matte composite digital ceremonial visor.",
    "category": "3d-digital-art",
    "subcategory": "Sculpture",
    "coverImageUrl": "/market-place images/11_geometric_mask_2.jpg",
    "previewImages": [
      "/market-place images/11_geometric_mask_2.jpg"
    ],
    "priceUsdc": 40,
    "priceBaseUnits": 40000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 56,
    "salesCount": 6,
    "tags": [
      "Mask",
      "Identity",
      "3D"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_algorithmic-vector-grid-beta",
    "title": "Algorithmic Vector Grid Beta",
    "slug": "algorithmic-vector-grid-beta",
    "description": "Modern brutalist geometric pattern set for poster design and web interfaces.",
    "category": "ui-ux-templates",
    "subcategory": "Design Systems",
    "coverImageUrl": "/market-place images/12_geo_pattern_2.png",
    "previewImages": [
      "/market-place images/12_geo_pattern_2.png"
    ],
    "priceUsdc": 25,
    "priceBaseUnits": 25000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "extended",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 63,
    "salesCount": 9,
    "tags": [
      "Brutalist",
      "Pattern",
      "WebUI"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_prism-mask-identity-iii",
    "title": "Prism Mask Identity III",
    "slug": "prism-mask-identity-iii",
    "description": "Tribal-futurist faceted headpiece with chromatic aberration shaders.",
    "category": "3d-digital-art",
    "subcategory": "Sculpture",
    "coverImageUrl": "/market-place images/12_geometric_mask_3.jpg",
    "previewImages": [
      "/market-place images/12_geometric_mask_3.jpg"
    ],
    "priceUsdc": 42,
    "priceBaseUnits": 42000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 70,
    "salesCount": 12,
    "tags": [
      "Mask",
      "Futurism",
      "3D"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_algorithmic-vector-grid-gamma",
    "title": "Algorithmic Vector Grid Gamma",
    "slug": "algorithmic-vector-grid-gamma",
    "description": "Parametric wireframe wave templates for fintech and Web3 landing pages.",
    "category": "ui-ux-templates",
    "subcategory": "Design Systems",
    "coverImageUrl": "/market-place images/13_geo_pattern_3.png",
    "previewImages": [
      "/market-place images/13_geo_pattern_3.png"
    ],
    "priceUsdc": 25,
    "priceBaseUnits": 25000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "extended",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 77,
    "salesCount": 15,
    "tags": [
      "Wireframe",
      "Fintech",
      "Web3"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_neo-shinjuku-twilight-i",
    "title": "Neo-Shinjuku Twilight I",
    "slug": "neo-shinjuku-twilight-i",
    "description": "Rain-drenched cyberpunk megalopolis illuminated by neon signage and soaring skyways.",
    "category": "illustrations",
    "subcategory": "Concept Art",
    "coverImageUrl": "/market-place images/13_neon_city_1.jpg",
    "previewImages": [
      "/market-place images/13_neon_city_1.jpg"
    ],
    "priceUsdc": 55,
    "priceBaseUnits": 55000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 84,
    "salesCount": 18,
    "tags": [
      "Cyberpunk",
      "ConceptArt",
      "Neon",
      "Cityscape"
    ],
    "isFeatured": true,
    "isTrending": true,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_algorithmic-vector-grid-delta",
    "title": "Algorithmic Vector Grid Delta",
    "slug": "algorithmic-vector-grid-delta",
    "description": "Isometric tech schematic vectors for dashboard architecture diagrams.",
    "category": "ui-ux-templates",
    "subcategory": "Design Systems",
    "coverImageUrl": "/market-place images/14_geo_pattern_4.png",
    "previewImages": [
      "/market-place images/14_geo_pattern_4.png"
    ],
    "priceUsdc": 25,
    "priceBaseUnits": 25000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "extended",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 91,
    "salesCount": 21,
    "tags": [
      "Isometric",
      "Architecture",
      "UI"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_algorithmic-vector-grid-epsilon",
    "title": "Algorithmic Vector Grid Epsilon",
    "slug": "algorithmic-vector-grid-epsilon",
    "description": "Kinetic typography backgrounds and vector grid distortions.",
    "category": "ui-ux-templates",
    "subcategory": "Design Systems",
    "coverImageUrl": "/market-place images/15_geo_pattern_5.png",
    "previewImages": [
      "/market-place images/15_geo_pattern_5.png"
    ],
    "priceUsdc": 30,
    "priceBaseUnits": 30000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "extended",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 98,
    "salesCount": 0,
    "tags": [
      "Kinetic",
      "Typography",
      "Vector"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_neo-shinjuku-twilight-iii",
    "title": "Neo-Shinjuku Twilight III",
    "slug": "neo-shinjuku-twilight-iii",
    "description": "High-altitude panoramic view of sprawling futuristic transit towers at dusk.",
    "category": "illustrations",
    "subcategory": "Concept Art",
    "coverImageUrl": "/market-place images/15_neon_city_3.jpg",
    "previewImages": [
      "/market-place images/15_neon_city_3.jpg"
    ],
    "priceUsdc": 60,
    "priceBaseUnits": 60000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 20,
    "salesCount": 3,
    "tags": [
      "Cityscape",
      "Futurism",
      "Cyberpunk"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_aetheria-skylands-i",
    "title": "Aetheria Skylands I",
    "slug": "aetheria-skylands-i",
    "description": "Surreal levitating archipelago with cascading waterfalls and ancient shrines.",
    "category": "illustrations",
    "subcategory": "Concept Art",
    "coverImageUrl": "/market-place images/16_floating_island_1.jpg",
    "previewImages": [
      "/market-place images/16_floating_island_1.jpg"
    ],
    "priceUsdc": 35,
    "priceBaseUnits": 35000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 27,
    "salesCount": 6,
    "tags": [
      "Fantasy",
      "FloatingIsland",
      "Environment"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_minimal-sunset-ridge-i",
    "title": "Minimal Sunset Ridge I",
    "slug": "minimal-sunset-ridge-i",
    "description": "Warm gradient mountain horizon illustration suited for modern editorial layouts.",
    "category": "textures-graphics",
    "subcategory": "Wallpapers",
    "coverImageUrl": "/market-place images/16_sunset_peaks_1.png",
    "previewImages": [
      "/market-place images/16_sunset_peaks_1.png"
    ],
    "priceUsdc": 18,
    "priceBaseUnits": 18000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 34,
    "salesCount": 9,
    "tags": [
      "Minimalist",
      "Sunset",
      "Mountains"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_aetheria-skylands-ii",
    "title": "Aetheria Skylands II",
    "slug": "aetheria-skylands-ii",
    "description": "Lush aerial peaks enveloped in sunlit cumulus clouds with mystic ruins.",
    "category": "illustrations",
    "subcategory": "Concept Art",
    "coverImageUrl": "/market-place images/17_floating_island_2.jpg",
    "previewImages": [
      "/market-place images/17_floating_island_2.jpg"
    ],
    "priceUsdc": 35,
    "priceBaseUnits": 35000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 41,
    "salesCount": 12,
    "tags": [
      "Landscape",
      "Ruins",
      "Sky"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_minimal-sunset-ridge-ii",
    "title": "Minimal Sunset Ridge II",
    "slug": "minimal-sunset-ridge-ii",
    "description": "Pastel dusk ridge silhouette featuring ambient grain textures.",
    "category": "textures-graphics",
    "subcategory": "Wallpapers",
    "coverImageUrl": "/market-place images/17_sunset_peaks_2.png",
    "previewImages": [
      "/market-place images/17_sunset_peaks_2.png"
    ],
    "priceUsdc": 18,
    "priceBaseUnits": 18000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 48,
    "salesCount": 15,
    "tags": [
      "Pastel",
      "Horizon",
      "Wallpaper"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_aetheria-skylands-iii",
    "title": "Aetheria Skylands III",
    "slug": "aetheria-skylands-iii",
    "description": "Nocturnal floating monoliths illuminated by twin moons and bioluminescence.",
    "category": "illustrations",
    "subcategory": "Concept Art",
    "coverImageUrl": "/market-place images/18_floating_island_3.jpg",
    "previewImages": [
      "/market-place images/18_floating_island_3.jpg"
    ],
    "priceUsdc": 38,
    "priceBaseUnits": 38000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 55,
    "salesCount": 18,
    "tags": [
      "Nocturnal",
      "Bioluminescent",
      "Fantasy"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_minimal-sunset-ridge-iii",
    "title": "Minimal Sunset Ridge III",
    "slug": "minimal-sunset-ridge-iii",
    "description": "Contrasting crimson and midnight blue mountain ranges.",
    "category": "textures-graphics",
    "subcategory": "Wallpapers",
    "coverImageUrl": "/market-place images/18_sunset_peaks_3.png",
    "previewImages": [
      "/market-place images/18_sunset_peaks_3.png"
    ],
    "priceUsdc": 20,
    "priceBaseUnits": 20000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 62,
    "salesCount": 21,
    "tags": [
      "Crimson",
      "Minimal",
      "Vector"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_sacred-harmonic-mandala-i",
    "title": "Sacred Harmonic Mandala I",
    "slug": "sacred-harmonic-mandala-i",
    "description": "Intricate fractal kaleidoscope mandala constructed through sacred mathematical ratios.",
    "category": "fine-art",
    "subcategory": "Fractal Art",
    "coverImageUrl": "/market-place images/19_mandala_1.jpg",
    "previewImages": [
      "/market-place images/19_mandala_1.jpg"
    ],
    "priceUsdc": 30,
    "priceBaseUnits": 30000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 69,
    "salesCount": 0,
    "tags": [
      "Mandala",
      "Fractal",
      "SacredGeometry"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_minimal-sunset-ridge-iv",
    "title": "Minimal Sunset Ridge IV",
    "slug": "minimal-sunset-ridge-iv",
    "description": "Desert valley gradient ridges at twilight with clean geometric contours.",
    "category": "textures-graphics",
    "subcategory": "Wallpapers",
    "coverImageUrl": "/market-place images/19_sunset_peaks_4.png",
    "previewImages": [
      "/market-place images/19_sunset_peaks_4.png"
    ],
    "priceUsdc": 20,
    "priceBaseUnits": 20000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 76,
    "salesCount": 3,
    "tags": [
      "Desert",
      "Twilight",
      "Graphic"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_minimal-sunset-ridge-v",
    "title": "Minimal Sunset Ridge V",
    "slug": "minimal-sunset-ridge-v",
    "description": "Nordic mountain dawn silhouette with subtle aurora gradients.",
    "category": "textures-graphics",
    "subcategory": "Wallpapers",
    "coverImageUrl": "/market-place images/20_sunset_peaks_5.png",
    "previewImages": [
      "/market-place images/20_sunset_peaks_5.png"
    ],
    "priceUsdc": 22,
    "priceBaseUnits": 22000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Vector Flow Systems",
    "creatorUsername": "vector_flow",
    "creatorAvatar": "/market-place images/11_geo_pattern_1.png",
    "likesCount": 83,
    "salesCount": 6,
    "tags": [
      "Nordic",
      "Aurora",
      "Gradient"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_ethereal-quartz-prism-i",
    "title": "Ethereal Quartz Prism I",
    "slug": "ethereal-quartz-prism-i",
    "description": "Procedurally crystallized gemstone featuring internal dispersion caustics.",
    "category": "3d-digital-art",
    "subcategory": "3D Render",
    "coverImageUrl": "/market-place images/21_crystal_gem_1.png",
    "previewImages": [
      "/market-place images/21_crystal_gem_1.png"
    ],
    "priceUsdc": 30,
    "priceBaseUnits": 30000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 90,
    "salesCount": 9,
    "tags": [
      "Crystal",
      "3D",
      "Gemstone",
      "Caustics"
    ],
    "isFeatured": true,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_sacred-harmonic-mandala-iii",
    "title": "Sacred Harmonic Mandala III",
    "slug": "sacred-harmonic-mandala-iii",
    "description": "Deep indigo and gold filigree mandala with radial symmetry vectors.",
    "category": "fine-art",
    "subcategory": "Fractal Art",
    "coverImageUrl": "/market-place images/21_mandala_3.jpg",
    "previewImages": [
      "/market-place images/21_mandala_3.jpg"
    ],
    "priceUsdc": 32,
    "priceBaseUnits": 32000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 97,
    "salesCount": 12,
    "tags": [
      "Indigo",
      "Gold",
      "Mandala"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_ethereal-quartz-prism-ii",
    "title": "Ethereal Quartz Prism II",
    "slug": "ethereal-quartz-prism-ii",
    "description": "Amethyst raw cluster model with physical transmission material properties.",
    "category": "3d-digital-art",
    "subcategory": "3D Render",
    "coverImageUrl": "/market-place images/22_crystal_gem_2.png",
    "previewImages": [
      "/market-place images/22_crystal_gem_2.png"
    ],
    "priceUsdc": 30,
    "priceBaseUnits": 30000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 19,
    "salesCount": 15,
    "tags": [
      "Amethyst",
      "3D",
      "Mineral"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_nocturnal-guardian-i",
    "title": "Nocturnal Guardian I",
    "slug": "nocturnal-guardian-i",
    "description": "Mythical horned owl perched in mystic enchanted cedar boughs.",
    "category": "illustrations",
    "subcategory": "Wildlife Art",
    "coverImageUrl": "/market-place images/22_night_owl_1.jpg",
    "previewImages": [
      "/market-place images/22_night_owl_1.jpg"
    ],
    "priceUsdc": 28,
    "priceBaseUnits": 28000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 26,
    "salesCount": 18,
    "tags": [
      "Owl",
      "Nocturnal",
      "Illustration"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_ethereal-quartz-prism-iii",
    "title": "Ethereal Quartz Prism III",
    "slug": "ethereal-quartz-prism-iii",
    "description": "Emerald octahedron gem render with subsurface light dispersion.",
    "category": "3d-digital-art",
    "subcategory": "3D Render",
    "coverImageUrl": "/market-place images/23_crystal_gem_3.png",
    "previewImages": [
      "/market-place images/23_crystal_gem_3.png"
    ],
    "priceUsdc": 35,
    "priceBaseUnits": 35000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 33,
    "salesCount": 21,
    "tags": [
      "Emerald",
      "Octahedron",
      "3D"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_nocturnal-guardian-iii",
    "title": "Nocturnal Guardian III",
    "slug": "nocturnal-guardian-iii",
    "description": "Moonlit predator portrait captured with traditional brushwork styling.",
    "category": "illustrations",
    "subcategory": "Wildlife Art",
    "coverImageUrl": "/market-place images/24_night_owl_3.jpg",
    "previewImages": [
      "/market-place images/24_night_owl_3.jpg"
    ],
    "priceUsdc": 32,
    "priceBaseUnits": 32000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Synthwave Studios",
    "creatorUsername": "synthwave_studios",
    "creatorAvatar": "/market-place images/13_neon_city_1.jpg",
    "likesCount": 40,
    "salesCount": 0,
    "tags": [
      "Wildlife",
      "Moonlight",
      "Traditional"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_ethereal-quartz-prism-v",
    "title": "Ethereal Quartz Prism V",
    "slug": "ethereal-quartz-prism-v",
    "description": "Topaz solar crystal monolith rendered in Octane Render at 6000x6000px.",
    "category": "3d-digital-art",
    "subcategory": "3D Render",
    "coverImageUrl": "/market-place images/25_crystal_gem_5.png",
    "previewImages": [
      "/market-place images/25_crystal_gem_5.png"
    ],
    "priceUsdc": 38,
    "priceBaseUnits": 38000000,
    "productType": "regular",
    "isNft": false,
    "isDemo": false,
    "status": "published",
    "licenseType": "commercial",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 47,
    "salesCount": 3,
    "tags": [
      "Topaz",
      "Monolith",
      "Octane"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_dynamic-gestural-study-i",
    "title": "Dynamic Gestural Study I",
    "slug": "dynamic-gestural-study-i",
    "description": "Abstract expressionist brush stroke dynamics captured with heavy impasto realism.",
    "category": "fine-art",
    "subcategory": "Abstract Expressionism",
    "coverImageUrl": "/market-place images/25_gestural_painting_1.jpg",
    "previewImages": [
      "/market-place images/25_gestural_painting_1.jpg"
    ],
    "priceUsdc": 50,
    "priceBaseUnits": 50000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 54,
    "salesCount": 6,
    "tags": [
      "Abstract",
      "Impasto",
      "Expressionism",
      "NFT"
    ],
    "isFeatured": false,
    "isTrending": true,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_dynamic-gestural-study-ii",
    "title": "Dynamic Gestural Study II",
    "slug": "dynamic-gestural-study-ii",
    "description": "Sweeping charcoal and raw sienna strokes reflecting kinetic human movement.",
    "category": "fine-art",
    "subcategory": "Abstract Expressionism",
    "coverImageUrl": "/market-place images/26_gestural_painting_2.jpg",
    "previewImages": [
      "/market-place images/26_gestural_painting_2.jpg"
    ],
    "priceUsdc": 50,
    "priceBaseUnits": 50000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 61,
    "salesCount": 9,
    "tags": [
      "Gestural",
      "Charcoal",
      "Kinetic"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_orbit-kepler-9b-i",
    "title": "Orbit Kepler-9B I",
    "slug": "orbit-kepler-9b-i",
    "description": "Atmospheric gas giant with razor-thin planetary ring system and aurora rings.",
    "category": "3d-digital-art",
    "subcategory": "Space Art",
    "coverImageUrl": "/market-place images/26_ringed_planet_1.png",
    "previewImages": [
      "/market-place images/26_ringed_planet_1.png"
    ],
    "priceUsdc": 40,
    "priceBaseUnits": 40000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 68,
    "salesCount": 12,
    "tags": [
      "Planet",
      "Space",
      "Astronomy",
      "NFT"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_dynamic-gestural-study-iii",
    "title": "Dynamic Gestural Study III",
    "slug": "dynamic-gestural-study-iii",
    "description": "Explosive monochromatic ink wash evoking stormy atmosphere and emotion.",
    "category": "fine-art",
    "subcategory": "Abstract Expressionism",
    "coverImageUrl": "/market-place images/27_gestural_painting_3.jpg",
    "previewImages": [
      "/market-place images/27_gestural_painting_3.jpg"
    ],
    "priceUsdc": 55,
    "priceBaseUnits": 55000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 75,
    "salesCount": 15,
    "tags": [
      "InkWash",
      "Monochrome",
      "NFT"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_constructivist-portrait-i-bauhaus",
    "title": "Constructivist Portrait I (Bauhaus)",
    "slug": "constructivist-portrait-i-bauhaus",
    "description": "Geometric face constructed using primary red, yellow, and blue geometric blocks.",
    "category": "fine-art",
    "subcategory": "Constructivism",
    "coverImageUrl": "/market-place images/28_bauhaus_face_1.jpg",
    "previewImages": [
      "/market-place images/28_bauhaus_face_1.jpg"
    ],
    "priceUsdc": 48,
    "priceBaseUnits": 48000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 82,
    "salesCount": 18,
    "tags": [
      "Bauhaus",
      "Constructivism",
      "ModernArt",
      "NFT"
    ],
    "isFeatured": true,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_constructivist-portrait-ii-bauhaus",
    "title": "Constructivist Portrait II (Bauhaus)",
    "slug": "constructivist-portrait-ii-bauhaus",
    "description": "Asymmetric facial architecture utilizing Swiss typography and grid discipline.",
    "category": "fine-art",
    "subcategory": "Constructivism",
    "coverImageUrl": "/market-place images/29_bauhaus_face_2.jpg",
    "previewImages": [
      "/market-place images/29_bauhaus_face_2.jpg"
    ],
    "priceUsdc": 48,
    "priceBaseUnits": 48000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 89,
    "salesCount": 21,
    "tags": [
      "Bauhaus",
      "SwissStyle",
      "Asymmetry"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_constructivist-portrait-iii-bauhaus",
    "title": "Constructivist Portrait III (Bauhaus)",
    "slug": "constructivist-portrait-iii-bauhaus",
    "description": "Cubist-constructivist hybrid profile celebrating early 20th century modernism.",
    "category": "fine-art",
    "subcategory": "Constructivism",
    "coverImageUrl": "/market-place images/30_bauhaus_face_3.jpg",
    "previewImages": [
      "/market-place images/30_bauhaus_face_3.jpg"
    ],
    "priceUsdc": 52,
    "priceBaseUnits": 52000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Atelier Kairo",
    "creatorUsername": "atelier_kairo",
    "creatorAvatar": "/market-place images/28_bauhaus_face_1.jpg",
    "likesCount": 96,
    "salesCount": 0,
    "tags": [
      "Modernism",
      "Constructivism",
      "Portrait"
    ],
    "isFeatured": false,
    "isTrending": false,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  },
  {
    "_id": "prod_orbit-kepler-9b-v",
    "title": "Orbit Kepler-9B V",
    "slug": "orbit-kepler-9b-v",
    "description": "Distant solar flare illuminating concentric ring shadows across glacial atmosphere.",
    "category": "3d-digital-art",
    "subcategory": "Space Art",
    "coverImageUrl": "/market-place images/30_ringed_planet_5.png",
    "previewImages": [
      "/market-place images/30_ringed_planet_5.png"
    ],
    "priceUsdc": 45,
    "priceBaseUnits": 45000000,
    "productType": "nft",
    "isNft": true,
    "isDemo": false,
    "status": "published",
    "licenseType": "exclusive",
    "creatorName": "Elysian Visual Lab",
    "creatorUsername": "elysian_lab",
    "creatorAvatar": "/market-place images/01_cosmic_orb_1.png",
    "likesCount": 18,
    "salesCount": 3,
    "tags": [
      "Space",
      "Planet",
      "Rings",
      "NFT"
    ],
    "isFeatured": false,
    "isTrending": true,
    "createdAt": "2026-11-01T00:00:00.000Z",
    "updatedAt": "2026-11-08T00:00:00.000Z"
  }
];

export function getFilteredFallbackProducts(params: {
  category?: string;
  search?: string;
  productType?: string;
  isNft?: boolean;
  page?: number;
  limit?: number;
} = {}): { items: Product[]; pagination: { total: number; totalPages: number } } {
  let items = [...FALLBACK_PRODUCTS];

  if (params.category && params.category !== 'all') {
    items = items.filter((p) => p.category === params.category);
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.creatorName.toLowerCase().includes(q)
    );
  }

  if (params.isNft !== undefined) {
    items = items.filter((p) => p.isNft === params.isNft);
  }

  const limit = params.limit || 50;
  const page = params.page || 1;
  const total = items.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginated = items.slice((page - 1) * limit, page * limit);

  return {
    items: paginated,
    pagination: { total, totalPages },
  };
}
