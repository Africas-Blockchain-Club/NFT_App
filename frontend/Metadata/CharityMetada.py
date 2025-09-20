import json
import os

# Read the data from public/nftmetadata.json
data = {
  "charities": [
    {
      "id": 1,
      "name": "Ocean Guardians",
      "description": "Protecting marine life and ecosystems from pollution and overfishing",
      "emoji": "🌊",
      "color": "bg-blue-500",
      "price": "0.2 ETH"
    },
    {
      "id": 2,
      "name": "Forest Preservation",
      "description": "Conserving rainforests and preventing deforestation worldwide",
      "emoji": "🌳",
      "color": "bg-green-600",
      "price": "0.15 ETH"
    },
    {
      "id": 3,
      "name": "Clean Water Initiative",
      "description": "Providing access to clean drinking water in developing nations",
      "emoji": "💧",
      "color": "bg-blue-400",
      "price": "0.18 ETH"
    },
    {
      "id": 4,
      "name": "Wildlife Rescue",
      "description": "Rescuing and rehabilitating endangered species around the world",
      "emoji": "🐾",
      "color": "bg-amber-600",
      "price": "0.25 ETH"
    },
    {
      "id": 5,
      "name": "Climate Action",
      "description": "Funding research and initiatives to combat climate change",
      "emoji": "🌎",
      "color": "bg-teal-500",
      "price": "0.22 ETH"
    },
    {
      "id": 6,
      "name": "Disaster Relief",
      "description": "Providing immediate aid to communities affected by natural disasters",
      "emoji": "🚑",
      "color": "bg-red-500",
      "price": "0.3 ETH"
    },
    {
      "id": 7,
      "name": "Education Equality",
      "description": "Ensuring all children have access to quality education regardless of location",
      "emoji": "📚",
      "color": "bg-indigo-500",
      "price": "0.16 ETH"
    },
    {
      "id": 8,
      "name": "Medical Research",
      "description": "Funding cutting-edge research for diseases affecting millions worldwide",
      "emoji": "❤️",
      "color": "bg-red-400",
      "price": "0.28 ETH"
    },
    {
      "id": 9,
      "name": "Hunger Relief",
      "description": "Providing meals and food security to communities in need",
      "emoji": "🍲",
      "color": "bg-orange-500",
      "price": "0.12 ETH"
    },
    {
      "id": 10,
      "name": "Refugee Support",
      "description": "Assisting refugees with shelter, food, and integration services",
      "emoji": "🕊️",
      "color": "bg-gray-400",
      "price": "0.2 ETH"
    },
    {
      "id": 11,
      "name": "Animal Sanctuary",
      "description": "Providing safe habitats for rescued farm and wild animals",
      "emoji": "🐄",
      "color": "bg-brown-500",
      "price": "0.15 ETH"
    },
    {
      "id": 12,
      "name": "Clean Energy",
      "description": "Supporting the transition to renewable energy sources worldwide",
      "emoji": "⚡",
      "color": "bg-yellow-500",
      "price": "0.24 ETH"
    },
    {
      "id": 13,
      "name": "Mental Health",
      "description": "Increasing access to mental health services and reducing stigma",
      "emoji": "🧠",
      "color": "bg-purple-400",
      "price": "0.19 ETH"
    },
    {
      "id": 14,
      "name": "Bee Conservation",
      "description": "Protecting bee populations and promoting pollinator-friendly habitats",
      "emoji": "🐝",
      "color": "bg-yellow-400",
      "price": "0.14 ETH"
    },
    {
      "id": 15,
      "name": "Coral Restoration",
      "description": "Rebuilding and protecting coral reefs from bleaching and destruction",
      "emoji": "🐠",
      "color": "bg-pink-400",
      "price": "0.23 ETH"
    },
    {
      "id": 16,
      "name": "Girls Education",
      "description": "Ensuring girls worldwide have equal access to education opportunities",
      "emoji": "👧",
      "color": "bg-pink-300",
      "price": "0.17 ETH"
    },
    {
      "id": 17,
      "name": "Veteran Support",
      "description": "Providing services and assistance to military veterans in need",
      "emoji": "🎖️",
      "color": "bg-blue-600",
      "price": "0.21 ETH"
    },
    {
      "id": 18,
      "name": "Anti-Poaching",
      "description": "Protecting endangered species from illegal hunting and trafficking",
      "emoji": "🦏",
      "color": "bg-gray-600",
      "price": "0.26 ETH"
    },
    {
      "id": 19,
      "name": "Homeless Shelter",
      "description": "Providing safe housing and support services for homeless individuals",
      "emoji": "🏠",
      "color": "bg-blue-300",
      "price": "0.13 ETH"
    },
    {
      "id": 20,
      "name": "Disability Access",
      "description": "Improving accessibility and inclusion for people with disabilities",
      "emoji": "♿",
      "color": "bg-blue-200",
      "price": "0.16 ETH"
    },
    {
      "id": 21,
      "name": "Arts Education",
      "description": "Bringing arts programs to underserved schools and communities",
      "emoji": "🎨",
      "color": "bg-red-300",
      "price": "0.15 ETH"
    },
    {
      "id": 22,
      "name": "Elder Care",
      "description": "Supporting quality care and companionship for elderly individuals",
      "emoji": "👵",
      "color": "bg-purple-300",
      "price": "0.18 ETH"
    },
    {
      "id": 23,
      "name": "Tech Literacy",
      "description": "Providing technology education and access to underserved communities",
      "emoji": "💻",
      "color": "bg-blue-700",
      "price": "0.22 ETH"
    },
    {
      "id": 24,
      "name": "Disaster Preparedness",
      "description": "Helping communities prepare for and mitigate natural disasters",
      "emoji": "⚠️",
      "color": "bg-orange-400",
      "price": "0.19 ETH"
    },
    {
      "id": 25,
      "name": "Indigenous Rights",
      "description": "Supporting land rights and cultural preservation for indigenous communities",
      "emoji": "🌄",
      "color": "bg-amber-500",
      "price": "0.2 ETH"
    },
    {
      "id": 26,
      "name": "Cancer Research",
      "description": "Funding innovative research for cancer treatments and cures",
      "emoji": "🎗️",
      "color": "bg-pink-500",
      "price": "0.3 ETH"
    },
    {
      "id": 27,
      "name": "Ocean Cleanup",
      "description": "Removing plastic pollution and debris from oceans and waterways",
      "emoji": "🗑️",
      "color": "bg-teal-400",
      "price": "0.21 ETH"
    },
    {
      "id": 28,
      "name": "Youth Sports",
      "description": "Providing sports opportunities for youth in underserved communities",
      "emoji": "⚽",
      "color": "bg-green-500",
      "price": "0.14 ETH"
    },
    {
      "id": 29,
      "name": "Food Banks",
      "description": "Supporting local food banks and hunger relief programs",
      "emoji": "🥫",
      "color": "bg-orange-300",
      "price": "0.12 ETH"
    },
    {
      "id": 30,
      "name": "Literacy Programs",
      "description": "Promoting literacy and reading skills for children and adults",
      "emoji": "📖",
      "color": "bg-indigo-400",
      "price": "0.15 ETH"
    },
    {
      "id": 31,
      "name": "Wildfire Recovery",
      "description": "Supporting communities affected by wildfires with recovery efforts",
      "emoji": "🔥",
      "color": "bg-red-600",
      "price": "0.25 ETH"
    },
    {
      "id": 32,
      "name": "Music Therapy",
      "description": "Providing music therapy programs for healing and wellness",
      "emoji": "🎵",
      "color": "bg-purple-500",
      "price": "0.17 ETH"
    },
    {
      "id": 33,
      "name": "Clean Air Initiative",
      "description": "Reducing air pollution and promoting respiratory health worldwide",
      "emoji": "💨",
      "color": "bg-cyan-400",
      "price": "0.2 ETH"
    },
    {
      "id": 34,
      "name": "Disaster Resilience",
      "description": "Building community resilience to withstand natural disasters",
      "emoji": "🏗️",
      "color": "bg-gray-500",
      "price": "0.22 ETH"
    },
    {
      "id": 35,
      "name": "Animal Adoption",
      "description": "Supporting animal shelters and promoting pet adoption programs",
      "emoji": "🐕",
      "color": "bg-brown-400",
      "price": "0.15 ETH"
    },
    {
      "id": 36,
      "name": "STEM Education",
      "description": "Promoting science, technology, engineering, and math education",
      "emoji": "🔬",
      "color": "bg-blue-800",
      "price": "0.23 ETH"
    },
    {
      "id": 37,
      "name": "Disaster Response",
      "description": "Rapid response teams providing immediate aid after disasters",
      "emoji": "🚁",
      "color": "bg-red-700",
      "price": "0.28 ETH"
    },
    {
      "id": 38,
      "name": "Community Gardens",
      "description": "Establishing urban gardens to promote food security and community",
      "emoji": "🌻",
      "color": "bg-green-400",
      "price": "0.13 ETH"
    },
    {
      "id": 39,
      "name": "Wildlife Corridors",
      "description": "Creating safe passages for wildlife to migrate and thrive",
      "emoji": "🦌",
      "color": "bg-amber-400",
      "price": "0.2 ETH"
    },
    {
      "id": 40,
      "name": "Medical Missions",
      "description": "Sending medical professionals to provide care in underserved areas",
      "emoji": "🏥",
      "color": "bg-red-300",
      "price": "0.27 ETH"
    }
  ]
}

# Create output directory if it doesn't exist
output_dir = "public/charity_files"
os.makedirs(output_dir, exist_ok=True)

# Process each charity
for charity in data["charities"]:
    # Create a copy and adjust the ID to start from 0
    charity_data = charity.copy()
    charity_data["id"] = charity["id"] - 1
    
    # Create filename
    filename = f"charity_{charity_data['id']:02d}.json"
    filepath = os.path.join(output_dir, filename)
    
    # Write to JSON file
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(charity_data, f, indent=2, ensure_ascii=False)
    
    print(f"Created: {filename}")

print(f"\nAll {len(data['charities'])} files created in the '{output_dir}' directory!")