-- Add contextual prompts to Unit 1 lesson content
-- These prompts will spark curiosity and guide students to ask questions
-- without explicitly telling them what to ask

-- Lesson 1: Introduction to Food Geography
-- This lesson introduces basic concepts, so prompts focus on sparking curiosity about location and place

UPDATE lessons
SET content = E'# Introduction to Food Geography

Welcome to an exciting journey exploring how geography shapes what we eat! Every food you consume has a story that begins with a place on Earth.

## What is Food Geography?

Food geography examines the relationship between food, people, and places. It helps us understand why certain foods grow in specific regions, how food travels across the world, and how geography influences our eating habits.

{{prompt|Have you ever wondered why rice is a staple food in Asia but not in Europe? What might make certain regions better for growing specific crops?}}

## The Five Themes of Geography

Throughout this course, we''ll explore food through five important geographic themes:

1. **Location** - Where is food grown or produced?
2. **Place** - What are the physical and human characteristics of food-producing regions?
3. **Human-Environment Interaction** - How do people adapt to or modify their environment for food production?
4. **Movement** - How does food travel from farms to our tables?
5. **Region** - What areas share similar food production characteristics?

{{prompt|Think about your breakfast this morning. Where do you think each item came from? How far did it travel to reach your plate?}}

## Why Study Food Geography?

Understanding food geography helps us:

- Appreciate cultural diversity in our diets
- Understand global trade patterns
- Recognize environmental impacts of food production
- Make informed decisions about what we eat

The food on your plate connects you to farmers, climates, soils, and cultures from around the world. Each meal is a geographic story waiting to be discovered.

{{prompt|What questions would you want to ask about where your favorite food comes from and why it grows there?}}

## Climate and Food Production

Climate plays a crucial role in determining what can grow in different regions. Temperature, rainfall, and seasons all influence agricultural possibilities.

Different climate zones support different crops:
- **Tropical climates**: Bananas, cocoa, coffee, rice
- **Temperate climates**: Wheat, apples, grapes
- **Arid climates**: Dates, olives, certain grains

{{prompt|If climate determines what can grow, how do you think climate change might affect the foods available to us in the future?}}

## The Global Food System

Today, food travels thousands of miles from where it''s grown to where it''s consumed. This complex network involves:

- Farmers and agricultural workers
- Transportation systems (ships, trucks, planes)
- Processing facilities
- Distribution centers
- Markets and grocery stores

This global system means you can eat strawberries in winter and bananas year-round, regardless of where you live.

## Your Role as a Geographic Thinker

As you progress through this course, you''ll develop skills to:

- Analyze maps showing food production patterns
- Understand the geographic factors influencing agriculture
- Trace food origins and supply chains
- Connect local food choices to global impacts

Get ready to see your meals in a whole new way! Every bite tells a geographic story.'
WHERE title = 'Introduction to Food Geography' 
  AND unit_id = (SELECT id FROM units WHERE title = 'Introduction to Food Geography');

-- Lesson 2: The Origins of Agriculture
-- This lesson covers historical development, so prompts emphasize location, place, and movement

UPDATE lessons
SET content = E'# The Origins of Agriculture

The transition from hunting and gathering to farming was one of the most significant changes in human history. This agricultural revolution didn''t happen everywhere at once—geography played a crucial role in where and how it developed.

## The Agricultural Revolution

Around 10,000 years ago, humans in different parts of the world independently began domesticating plants and animals. This shift transformed human society forever.

{{prompt|Why do you think agriculture developed independently in different regions rather than spreading from one location? What might have made certain places more suitable for early farming?}}

## Centers of Agricultural Origin

Archaeologists and geographers have identified several "hearths" where agriculture first developed:

### The Fertile Crescent (Southwest Asia)
- **Location**: Modern-day Iraq, Syria, Lebanon, Israel, Palestine, Jordan
- **Key crops**: Wheat, barley, lentils
- **Key animals**: Sheep, goats, cattle
- **Time period**: Around 10,000 years ago

The Fertile Crescent earned its name from its crescent shape and exceptionally fertile soil, nourished by the Tigris and Euphrates rivers.

{{prompt|Rivers were crucial to early civilizations. What advantages would farming near a river provide? What challenges might farmers face?}}

### East Asia
- **Location**: Yellow River and Yangtze River valleys in China
- **Key crops**: Rice, millet, soybeans
- **Key animals**: Pigs, chickens, water buffalo
- **Time period**: Around 9,000 years ago

The warm, wet climate and abundant water made these river valleys ideal for rice cultivation, which remains central to Asian cuisine today.

### Mesoamerica
- **Location**: Modern-day Mexico and Central America
- **Key crops**: Maize (corn), beans, squash, cacao
- **Key animals**: Turkeys, dogs
- **Time period**: Around 7,000-9,000 years ago

{{prompt|Mesoamerica had fewer domesticated animals than other regions. How might this have affected the foods people ate and the way they farmed?}}

### Sub-Saharan Africa
- **Location**: Multiple regions across Africa
- **Key crops**: Sorghum, millet, yams, African rice
- **Key animals**: Guinea fowl
- **Time period**: Around 5,000-7,000 years ago

### Andean South America
- **Location**: Modern-day Peru, Bolivia, Ecuador
- **Key crops**: Potatoes, quinoa, tomatoes
- **Key animals**: Llamas, alpacas, guinea pigs
- **Time period**: Around 8,000 years ago

The high-altitude Andes Mountains created unique growing conditions that led to the domestication of potatoes—now one of the world''s most important crops.

## Why These Locations?

These agricultural hearths shared several geographic characteristics:

1. **Favorable climate**: Adequate rainfall and suitable temperatures
2. **Fertile soil**: Often enriched by river flooding
3. **Wild ancestors**: Native plants and animals suitable for domestication
4. **Water access**: Rivers, lakes, or reliable rainfall

{{prompt|Looking at where agriculture didn''t develop early, what geographic factors might have prevented it? Think about deserts, icy regions, or dense rainforests.}}

## The Spread of Agricultural Knowledge

Once established, agricultural practices spread through:

- **Migration**: Farmers moving to new areas
- **Trade**: Exchange of seeds, animals, and techniques
- **Conquest**: Empires spreading their agricultural systems
- **Cultural diffusion**: Ideas spreading between neighboring groups

This movement created new regional cuisines as crops adapted to new environments and combined with local foods.

## Impact on Human Geography

The agricultural revolution transformed how humans lived:

- **Permanent settlements**: No need to follow food sources
- **Population growth**: More reliable food supply
- **Specialization**: Not everyone needed to produce food
- **Trade networks**: Surplus food could be exchanged
- **Social structures**: New forms of organization emerged

{{prompt|If agriculture allowed people to settle in one place, how might this have changed the relationship between humans and their environment?}}

## Legacy of Early Agriculture

The crops and animals domesticated thousands of years ago still form the foundation of our modern food system. The geographic patterns established by early agricultural hearths continue to influence:

- What we eat today
- Global trade in agricultural products
- Cultural food preferences
- Agricultural research and development

Understanding where agriculture began helps us appreciate the deep geographic roots of our modern meals.'
WHERE title = 'The Origins of Agriculture'
  AND unit_id = (SELECT id FROM units WHERE title = 'Introduction to Food Geography');

-- Lesson 3: The Columbian Exchange
-- This lesson is about movement and interaction, so prompts emphasize those themes

UPDATE lessons  
SET content = E'# The Columbian Exchange

When Christopher Columbus reached the Americas in 1492, he set in motion one of the most significant exchanges of plants, animals, diseases, and cultures in human history. This event, known as the Columbian Exchange, dramatically transformed what people ate around the world.

## What Was the Columbian Exchange?

The Columbian Exchange refers to the transfer of plants, animals, diseases, people, and ideas between the Americas (the "New World") and Europe, Africa, and Asia (the "Old World") following Columbus''s voyages.

{{prompt|Imagine never having tasted tomatoes, potatoes, chocolate, or corn. What would Italian, Irish, or Mexican cuisine be like without these foods? How might they have gotten there?}}

## From the Americas to the Rest of the World

### Major Crops That Traveled East

**Potatoes**
- **Origin**: Andean highlands of South America
- **Impact**: Became a staple crop in Europe, especially Ireland
- **Geographic advantage**: Could grow in cooler climates where wheat struggled

**Tomatoes**
- **Origin**: Western South America and Central America  
- **Impact**: Essential to Italian cuisine, Spanish dishes, and cuisines worldwide
- **Initial reception**: Europeans feared they were poisonous!

{{prompt|Many "New World" foods were initially met with suspicion. What might make people hesitant to try unfamiliar foods? How do new foods eventually become accepted?}}

**Maize (Corn)**
- **Origin**: Mesoamerica (Mexico)
- **Impact**: Became a global staple crop, especially in Africa and Asia
- **Versatility**: Could grow in diverse climates

**Cacao (Chocolate)**
- **Origin**: Amazon basin and Central America
- **Impact**: Became a luxury food in Europe
- **Transformation**: From bitter ceremonial drink to sweetened treat

**Other Important Transfers**:
- Vanilla
- Chili peppers
- Pineapples
- Peanuts
- Squash
- Beans
- Tobacco

## From Europe, Africa, and Asia to the Americas

### Major Crops and Animals That Traveled West

**Wheat**
- **Origin**: Middle East (Fertile Crescent)
- **Impact**: Became a major crop in North and South America
- **Adaptation**: Required clearing forest land

**Sugarcane**
- **Origin**: New Guinea and Southeast Asia
- **Impact**: Established plantation economies in the Caribbean and Brazil
- **Dark legacy**: Drove the transatlantic slave trade

{{prompt|Sugarcane plantations had enormous social and geographic impacts. What kinds of labor, land, and climate would be needed to grow sugar? What would be the consequences?}}

**Livestock**
- Cattle, pigs, sheep, goats, chickens, horses
- **Impact**: Transformed indigenous diets and transportation
- **Environmental effects**: Grazing animals altered American landscapes

**Citrus Fruits**
- Oranges, lemons, limes
- **Origin**: Southeast Asia
- **Adaptation**: Thrived in warm American climates like Florida and California

**Coffee**
- **Origin**: Ethiopia
- **Journey**: Africa → Americas via European colonizers
- **Impact**: Central and South America became major coffee producers

**Rice**
- **Origin**: Asia and Africa
- **Impact**: Became crucial crop in lowland American regions
- **Labor**: Required intensive cultivation

## Geographic Impacts of the Exchange

### Population Changes

The Columbian Exchange caused dramatic population shifts:

- **Americas**: Indigenous populations declined catastrophically due to Old World diseases (smallpox, measles)
- **Europe**: Population increased due to nutritious New World crops like potatoes
- **Africa**: Population affected by slave trade to work American plantations

{{prompt|Disease traveled along the same routes as food and people. How might geographic isolation before 1492 have made indigenous Americans more vulnerable to European diseases?}}

### Environmental Transformation

The exchange transformed landscapes:

- Forests cleared for European-style farming
- Grazing animals changed grasslands
- New crops altered soil composition
- European farming techniques reshaped American terrain

### Economic Reorganization

New global trade networks emerged:

- **Plantation economies**: Sugar, tobacco, cotton
- **Mining operations**: Silver, gold
- **Trade routes**: Connecting continents for the first time
- **Market dependencies**: Regions specializing in specific crops

{{prompt|When regions specialize in growing one or two crops for export, what advantages and disadvantages might this create? Think about Ireland and potatoes, or Caribbean islands and sugar.}}

## Regional Cuisines Transformed

The Columbian Exchange created the cuisines we know today:

- **Italian**: Tomato-based sauces (tomatoes from Americas)
- **Irish**: Potato-based dishes (potatoes from Americas)
- **Indian**: Chili-spiced cuisine (chilies from Americas)
- **Mexican**: Wheat tortillas alongside corn (wheat from Old World)
- **Thai**: Peanut sauces (peanuts from Americas)

Everything we think of as "traditional" food is actually the product of global exchange!

## The Darker Side of the Exchange

While the Columbian Exchange brought new foods and opportunities, it also caused tremendous suffering:

- Millions of indigenous Americans died from diseases
- The trans Atlantic slave trade forcibly moved millions of Africans
- Colonial exploitation devastated native societies
- Environmental destruction eliminated native species

{{prompt|Food geography isn''t just about crops and climate—it involves power, people, and consequences. How do you think the foods we eat today still reflect these historical inequalities?}}

## Legacy Today

The Columbian Exchange continues to shape our world:

- Modern global food trade follows routes established 500+ years ago
- Crop diversity in each region traces back to these exchanges
- Economic inequalities from colonial plantation systems persist
- We take for granted foods that were once exotic innovations

Understanding this history helps us see how deeply interconnected our food system has always been.'
WHERE title = 'The Columbian Exchange'
  AND unit_id = (SELECT id FROM units WHERE title = 'Introduction to Food Geography');

-- Lesson 4: Food and Climate Zones
-- This lesson focuses on place and human-environment interaction

UPDATE lessons
SET content = E'# Food and Climate Zones

Climate is one of the most powerful forces shaping what foods can grow in different regions. Understanding climate zones helps explain why certain foods become dietary staples in some places but not others.

## Understanding Climate Zones

Geographers classify Earth''s climates into several major zones:

1. **Tropical**: Hot and wet year-round
2. **Dry (Arid and Semi-Arid)**: Limited rainfall
3. **Temperate**: Moderate temperatures with distinct seasons
4. **Continental**: Extreme temperature variations
5. **Polar**: Extremely cold

Each climate zone supports different types of agriculture and produces distinct food cultures.

{{prompt|Think about the climate where you live. What foods grow naturally in your region? What foods do you eat that must come from far away because they can''t grow locally?}}

## Tropical Climate Zones

### Characteristics
- **Temperature**: Warm year-round (typically above 64°F/18°C)
- **Precipitation**: High rainfall (often 79+ inches annually)
- **Seasons**: Minimal temperature variation; wet and dry seasons instead

### Typical Crops
- **Fruits**: Bananas, mangoes, papayas, pineapples, passion fruit
- **Staples**: Rice (in wetlands), cassava, taro, yams
- **Export crops**: Cacao, coffee, coconuts, palm oil
- **Spices**: Black pepper, vanilla, ginger, cinnamon

### Example Region: Southeast Asia

The tropical climate in countries like Thailand, Vietnam, and Indonesia creates ideal conditions for rice cultivation. The warmth and abundant rainfall support multiple rice harvests per year.

{{prompt|Tropical regions can grow an abundance of food year-round. But what challenges might heavy rainfall, heat, and humidity create for farmers and for storing food?}}

## Dry (Arid and Semi-Arid) Climate Zones

### Characteristics
- **Temperature**: Hot days, often cool nights; extreme variation
- **Precipitation**: Less than 10-20 inches annually
- **Challenges**: Water scarcity, soil erosion, limited vegetation

### Typical Crops
- **Drought-resistant grains**: Millet, sorghum, certain wheats
- **Fruits**: Dates, figs, olives, pomegranates
- **Vegetables**: Beans, lentils (adapted varieties)
- **Livestock**: Goats, camels, sheep (grazing animals suited to sparse vegetation)

### Example Region: Middle East and North Africa

Oasis agriculture and irrigation systems have supported civilizations in dry climates for thousands of years. Crops like dates and olives are specifically adapted to withstand heat and conserve water.

{{prompt|How might people living in dry climates need to modify their environment to grow food? What innovations might they develop to work with limited water?}}

## Temperate Climate Zones

### Characteristics
- **Temperature**: Moderate with four distinct seasons
- **Precipitation**: Regular rainfall (20-40 inches annually)
- **Growing season**: Spring through fall

### Typical Crops

**Cool-season crops**:
- Wheat, barley, oats
- Potatoes, carrots, cabbage, lettuce
- Apples, pears, cherries

**Warm-season crops** (summer):
- Corn, tomatoes, peppers, squash
- Grapes, peaches, berries

### Example Region: Western Europe

The temperate climate of France, Germany, and the UK supports diverse agriculture: wheat fields, apple orchards, vegetable gardens, and dairy farming. The moderate rainfall and mild temperatures create ideal conditions for many crops.

{{prompt|Temperate regions have seasons that change what can grow throughout the year. How might this seasonal variation have shaped the food preservation techniques and eating traditions in these regions?}}

## Continental Climate Zones

### Characteristics
- **Temperature**: Extreme variations (hot summers, cold winters)
- **Precipitation**: Moderate, often concentrated in summer
- **Growing season**: Short but intense

### Typical Crops
- **Grains**: Wheat, barley, rye (cold-hardy varieties)
- **Root vegetables**: Potatoes, beets, turnips
- **Hardy fruits**: Apples, currants
- **Livestock**: Cattle, pigs, chickens (with winter shelter)

### Example Region: Central Russia and Canada

Short growing seasons require crops that can mature quickly. Root vegetables can be stored through long winters. Historically, food preservation (pickling, drying, fermenting) was essential for survival.

## Mediterranean Climate Zones

### Characteristics
- **Temperature**: Mild, wet winters; hot, dry summers
- **Precipitation**: Winter rainfall (15-30 inches annually)
- **Unique pattern**: Opposite of most climates (dry when warm, wet when cool)

### Typical Crops
- Olives, grapes, citrus fruits
- Tomatoes, eggplants, zucchini
- Wheat (grown in winter, harvested in spring)
- Herbs: Rosemary, thyme, oregano

### Example Region: Mediterranean Basin

The climate that gives this zone its name produces distinctive foods: olive oil, wine, citrus, and drought-resistant vegetables. This agricultural pattern has defined Mediterranean cuisine for millennia.

{{prompt|Mediterranean climates have hot, dry summers when many other places have summer rain. How might farmers adapt their practices to have water available when it''s dry?}}

## Polar and Subpolar Zones

### Characteristics
- **Temperature**: Extremely cold; short, cool summers
- **Precipitation**: Low (frozen precipitation)
- **Growing season**: Very brief or non-existent

### Food Sources
- **Traditional**: Fishing, hunting, foraging
- **Limited agriculture**: Hardy greens, potatoes (in subarctic areas)
- **Modern innovations**: Greenhouses, imported foods

### Example Region: Arctic Scandinavia

Indigenous Sami people traditionally relied on reindeer herding, fishing, and preservation techniques. Modern technology now enables some local production, but most food is imported.

{{prompt|In regions with extremely short growing seasons or no agriculture, how do you think people obtained food historically? How might their diet differ from people in tropical regions?}}

## Highland and Mountain Climates

### Characteristics
- **Temperature**: Decreases with elevation
- **Precipitation**: Varies by location and altitude
- **Unique zones**: Different crops at different elevations

### Typical Crops (by altitude)
- **Low elevations**: Tropical or temperate crops
- **Mid elevations**: Coffee, tea, certain fruits
- **High elevations**: Potatoes, quinoa, barley, hardy grains

### Example Region: Andes Mountains

The Andes showcase "vertical farming"—growing different crops at different elevations. Indigenous farmers developed potato varieties that could survive at high altitudes where other crops failed.

{{prompt|Mountains create many different microclimates at different elevations. How might this diversity of growing zones in one geographic area have benefited ancient civilizations?}}

## Climate Change and Food Production

Today, climate zones are shifting due to global warming:

- Growing seasons lengthening in some areas, shortening in others
- Traditional crop zones moving toward the poles
- Extreme weather (droughts, floods) disrupting food production
- Farmers adapting by changing crops or techniques

{{prompt|As climate zones shift, what might happen to the foods we''re used to eating? How might farmers in different regions need to adapt their practices?}}

## Connecting Climate to Your Plate

Every food you eat reflects the climate where it was grown:

- Your morning orange juice: Mediterranean or subtropical climate
- Bread: Temperate wheat fields
- Chocolate: Tropical cacao plantations
- Coffee: Highland tropical zones

Understanding climate zones helps us appreciate the geographic diversity of our food system and recognize how climate shapes human culture and cuisine.

The next time you eat a meal, try to imagine the climates that produced each ingredient. You''re experiencing Earth''s climate zones on a single plate!'
WHERE title = 'Food and Climate Zones'
  AND unit_id = (SELECT id FROM units WHERE title = 'Introduction to Food Geography');
