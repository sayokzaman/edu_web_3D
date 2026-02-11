export interface PlanetInfo {
    name: string
    displayName: string
    type: string
    diameter: string
    mass: string
    distanceFromSun: string
    orbitalPeriod: string
    rotationPeriod: string
    temperature: string
    moons: string
    description: string
    facts: string[]
}

export const planetsData: { [key: string]: PlanetInfo } = {
    sun: {
        name: 'sun',
        displayName: 'The Sun',
        type: 'G-type Main-Sequence Star',
        diameter: '1,392,700 km',
        mass: '1.989 × 10³⁰ kg',
        distanceFromSun: '0 km (center)',
        orbitalPeriod: 'N/A',
        rotationPeriod: '~25 days (equator)',
        temperature: '5,500°C (surface)',
        moons: '0',
        description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.',
        facts: ["Contains 99.86% of the Solar System's mass", 'Could fit 1.3 million Earths inside it', 'Light from the Sun takes 8 minutes to reach Earth', 'The Sun is about 4.6 billion years old']
    },
    mercury: {
        name: 'mercury',
        displayName: 'Mercury',
        type: 'Terrestrial Planet',
        diameter: '4,879 km',
        mass: '3.285 × 10²³ kg',
        distanceFromSun: '57.9 million km',
        orbitalPeriod: '88 Earth days',
        rotationPeriod: '59 Earth days',
        temperature: '-173°C to 427°C',
        moons: '0',
        description: "Mercury is the smallest planet in our solar system and the closest to the Sun. It has a heavily cratered surface similar to Earth's Moon.",
        facts: ['Named after the Roman messenger god', 'Has the most eccentric orbit of all planets', 'One day on Mercury lasts 176 Earth days', 'Has a large iron core making up 75% of its radius']
    },
    venus: {
        name: 'venus',
        displayName: 'Venus',
        type: 'Terrestrial Planet',
        diameter: '12,104 km',
        mass: '4.867 × 10²⁴ kg',
        distanceFromSun: '108.2 million km',
        orbitalPeriod: '225 Earth days',
        rotationPeriod: '243 Earth days (retrograde)',
        temperature: '462°C average',
        moons: '0',
        description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It has a thick, toxic atmosphere filled with carbon dioxide.",
        facts: ['Hottest planet in our solar system', 'Rotates backwards compared to most planets', 'A day on Venus is longer than its year', 'Named after the Roman goddess of love and beauty']
    },
    earth: {
        name: 'earth',
        displayName: 'Earth',
        type: 'Terrestrial Planet',
        diameter: '12,742 km',
        mass: '5.972 × 10²⁴ kg',
        distanceFromSun: '149.6 million km',
        orbitalPeriod: '365.25 days',
        rotationPeriod: '24 hours',
        temperature: '-88°C to 58°C',
        moons: '1 (The Moon)',
        description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is covered with water.",
        facts: ['The only known planet to support life', 'Has a powerful magnetic field', '70% of the surface is covered by water', 'The atmosphere is 78% nitrogen and 21% oxygen']
    },
    mars: {
        name: 'mars',
        displayName: 'Mars',
        type: 'Terrestrial Planet',
        diameter: '6,779 km',
        mass: '6.39 × 10²³ kg',
        distanceFromSun: '227.9 million km',
        orbitalPeriod: '687 Earth days',
        rotationPeriod: '24.6 hours',
        temperature: '-87°C to -5°C',
        moons: '2 (Phobos and Deimos)',
        description: 'Mars is the fourth planet from the Sun, often called the "Red Planet" due to iron oxide on its surface. It has the largest volcano in the solar system.',
        facts: ['Home to Olympus Mons, the largest volcano', 'Has polar ice caps made of water and CO₂', 'A day on Mars is called a "sol"', 'Named after the Roman god of war']
    },
    jupiter: {
        name: 'jupiter',
        displayName: 'Jupiter',
        type: 'Gas Giant',
        diameter: '139,820 km',
        mass: '1.898 × 10²⁷ kg',
        distanceFromSun: '778.5 million km',
        orbitalPeriod: '12 Earth years',
        rotationPeriod: '10 hours',
        temperature: '-108°C average',
        moons: '95 confirmed',
        description: "Jupiter is the largest planet in our solar system. It's a gas giant with a Great Red Spot, a giant storm that has been raging for hundreds of years.",
        facts: ['Could fit 1,300 Earths inside it', 'Has the shortest day of all planets', 'The Great Red Spot is a storm larger than Earth', 'Has a faint ring system discovered in 1979']
    },
    saturn: {
        name: 'saturn',
        displayName: 'Saturn',
        type: 'Gas Giant',
        diameter: '116,460 km',
        mass: '5.683 × 10²⁶ kg',
        distanceFromSun: '1.434 billion km',
        orbitalPeriod: '29 Earth years',
        rotationPeriod: '10.7 hours',
        temperature: '-138°C average',
        moons: '146 confirmed',
        description: "Saturn is the sixth planet from the Sun and is famous for its spectacular ring system made of ice and rock particles. It's the second-largest planet.",
        facts: ['Has the most extensive ring system', 'Could float in water due to low density', 'Has winds up to 1,800 km/h', 'Named after the Roman god of agriculture']
    }
}
