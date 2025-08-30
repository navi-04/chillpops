// Flavour data for the flavour section
const flavours = [
    {
        id: 1,
        name: "Strawberry Splash",
        description: "Sweet, juicy strawberries picked at peak ripeness",
        image: "images/1.jpg",
        tags: ["Bestseller", "Vegan"]
    },
    {
        id: 2,
        name: "Mango Tango",
        description: "Tropical mango purée with a hint of lime",
        image: "images/2.jpg",
        tags: ["New", "Gluten-free"]
    },
    {
        id: 3,
        name: "Blueberry Bliss",
        description: "Wild blueberries with a touch of honey",
        image: "popsicle.jpg",
        tags: ["Seasonal"]
    },
    {
        id: 4,
        name: "Creamy Coconut",
        description: "Rich coconut cream with vanilla bean",
        image: "popsicle.jpg",
        tags: ["Dairy-free"]
    },
    {
        id: 5,
        name: "Chocolate Dream",
        description: "Rich dark chocolate with a velvety texture",
        image: "popsicle.jpg",
        tags: ["Classic"]
    },
        {
        id: 6,
        name: "Strawberry Splash",
        description: "Sweet, juicy strawberries picked at peak ripeness",
        image: "popsicle.jpg",
        tags: ["Bestseller", "Vegan"]
    },
];

// About section feature data
const aboutFeatures = [
    {
        id: 1,
        icon: "🍓",
        title: "100% Natural",
        description: "Only real fruits and ingredients you can pronounce"
    },
    {
        id: 2,
        icon: "🌱",
        title: "Eco-Friendly",
        description: "Sustainable sourcing and compostable packaging"
    },
    {
        id: 3,
        icon: "✨",
        title: "Artisanal",
        description: "Handcrafted in small batches for perfect flavor"
    }
];

// Franchise section feature data
const franchiseFeatures = [
    {
        id: 1,
        icon: "🚀",
        title: "Low Startup Costs",
        description: "Affordable investment with multiple store format options"
    },
    {
        id: 2,
        icon: "📈",
        title: "Proven Model",
        description: "Established systems and processes for success"
    },
    {
        id: 3,
        icon: "🤝",
        title: "Full Support",
        description: "Comprehensive training and ongoing assistance"
    }
];

// Franchise stats data
const franchiseStats = [
    {
        label: "Locations",
        count: 50
    },
    {
        label: "Success Rate",
        count: 95
    },
    {
        label: "Daily Customers",
        count: 5000
    }
];

// Contact information
const contactInfo = {
    address: "123 Popsicle, abc City, FC 12345",
    phone: "8608677757",
    email: "chillpopsofficial@gmail.com",
    hours: [
        { day: "Monday - Friday", time: "10:00 AM - 8:00 PM" },
        { day: "Saturday", time: "10:00 AM - 9:00 PM" },
        { day: "Sunday", time: "11:00 AM - 7:00 PM" }
    ],
    social: [
        { platform: "Facebook", url: "#" },
        { platform: "Instagram", url: "#" }
    ]
};

// Export all data for use in script.js
export { 
    flavours, 
    aboutFeatures, 
    franchiseFeatures, 
    franchiseStats, 
    contactInfo 
};
