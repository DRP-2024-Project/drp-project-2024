const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()):

const port = process.env.PORT || 3000;

const DATA = [
    { communityId: '1', title: 'Morning Jogging Club', description: 'Group jogs in the local park', price: "£0", perTime: "week", location: 'Greenwood Park', schedule: 'Mon, Wed, Fri at 6 AM', contactInfo: 'joggingclub@example.com', requiredEquipment: 'Running shoes'},
    { communityId: '2', title: 'Weekend Warriors Basketball', description: 'Weekend basketball games for casual players', price: "£3", perTime: "session", location: 'Downtown Sports Center', schedule: 'Every Saturday at 10 AM', contactInfo: 'weekendhoops@example.com', requiredEquipment: 'Basketball shoes, sports attire'},
    { communityId: '3', title: 'Yoga Retreats', description: 'Peaceful yoga sessions to rejuvenate your mind and body', price: "£20", perTime: "month", location: 'Lotus Yoga Studio', schedule: 'Tue and Thu at 7 PM', contactInfo: 'lotusyoga@example.com', requiredEquipment: 'Yoga mat, towel'},
    { communityId: '4', title: 'Elite Tennis Club', description: 'Competitive tennis sessions for advanced players', price: "£15", perTime: "month", location: 'Riverside Tennis Courts', schedule: 'Weekends at 3 PM', contactInfo: 'elite.tennis@example.com', requiredEquipment: 'Tennis racket, tennis balls'},
    { communityId: '5', title: 'Mountain Biking Adventures', description: 'Challenging mountain biking trails for thrill-seekers', price: "£10", perTime: "month", location: 'Highland Trails', schedule: 'Every Sunday at 9 AM', contactInfo: 'mtbadventure@example.com', requiredEquipment: 'Mountain bike, helmet, gloves'},
    { communityId: '6', title: 'Senior Water Aerobics', description: 'Low-impact water exercises ideal for seniors', price: "£8", perTime: "month", location: 'Community Pool', schedule: 'Mon, Wed, Fri at 10 AM', contactInfo: 'senioraqua@example.com', requiredEquipment: 'Swimsuit, water shoes'},
    { communityId: '7', title: 'Dynamic Pilates', description: 'Dynamic Pilates classes to strengthen and tone your body', price: "£18", perTime: "month", location: 'Pilates Power Gym', schedule: 'Tue and Thu at 5 PM', contactInfo: 'dynamicpilates@example.com', requiredEquipment: 'Pilates mat, comfortable clothing'},
    { communityId: '8', title: 'Kids Soccer Camp', description: 'Fun and educational soccer training for kids', price: "£12", perTime: "month", location: 'City Sports Complex', schedule: 'Saturday mornings', contactInfo: 'kidssoccer@example.com', requiredEquipment: 'Soccer ball, shin guards'},
    { communityId: '9', title: 'Outdoor Fitness Bootcamp', description: 'High-intensity fitness classes in the great outdoors', price: "£25", perTime: "month", location: 'Central Park', schedule: 'Every Tuesday at 6 AM', contactInfo: 'bootcamp@example.com', requiredEquipment: 'Gym attire, water bottle'},
    { communityId: '10', title: 'Rock Climbing Sessions', description: 'Indoor and outdoor rock climbing for all skill levels', price: "£30", perTime: "month", location: 'ClimbOn Gym', schedule: 'Weekday evenings', contactInfo: 'climbon@example.com', requiredEquipment: 'Climbing shoes, harness'},
    { communityId: '11', title: 'Amateur Boxing Club', description: 'Boxing training and sparring sessions', price: "£15", perTime: "month", location: 'Downtown Boxing Gym', schedule: 'Mon, Wed, and Fri at 7 PM', contactInfo: 'amateurboxing@example.com', requiredEquipment: 'Boxing gloves, mouthguard'},
    { communityId: '12', title: 'Triathlon Preparation Group', description: 'Training sessions covering swimming, cycling, and running', price: "£35", perTime: "month", location: 'City Sports Club', schedule: 'Weekends at 8 AM', contactInfo: 'triathlonprep@example.com', requiredEquipment: 'Swim gear, bicycle, running shoes'},
    { communityId: '13', title: 'Beach Volleyball League', description: 'Competitive and fun beach volleyball games', price: "£5", perTime: "game", location: 'Sandy Beach Courts', schedule: 'Thursdays at 5 PM', contactInfo: 'beachvolley@example.com', requiredEquipment: 'Volleyball, sunglasses'},
    { communityId: '14', title: 'Hiking and Nature Walks', description: 'Guided hikes through scenic trails and nature reserves', price: "Free", perTime: "event", location: 'Trailhead Park', schedule: 'First Saturday of each month', contactInfo: 'hikingclub@example.com', requiredEquipment: 'Hiking boots, backpack'},
    { communityId: '15', title: 'CrossFit Challenges', description: 'CrossFit workouts designed to test your limits', price: "£20", perTime: "month", location: 'CrossFit Box', schedule: 'Mon, Wed, Fri at 6 AM', contactInfo: 'crossfitchallenge@example.com', requiredEquipment: 'Workout clothes, water bottle'},
    { communityId: '16', title: 'Dance Fitness Fiesta', description: 'Dance your way to fitness with high-energy classes', price: "£12", perTime: "month", location: 'Downtown Dance Studio', schedule: 'Tuesday and Thursday evenings', contactInfo: 'dancefiesta@example.com', requiredEquipment: 'Comfortable dance shoes, attire'},
    { communityId: '17', title: 'Martial Arts Dojo', description: 'Traditional and modern martial arts training', price: "£25", perTime: "month", location: 'Warrior Dojo', schedule: 'Mon, Wed, Sat mornings', contactInfo: 'martialartsdojo@example.com', requiredEquipment: 'Gi or comfortable clothing'},
    { communityId: '18', title: 'Golf Clinics', description: 'Golf lessons for beginners and intermediate players', price: "£30", perTime: "session", location: 'Riverside Golf Course', schedule: 'Weekend mornings', contactInfo: 'golfclinic@example.com', requiredEquipment: 'Golf clubs, golf balls'},
    { communityId: '19', title: 'Roller Skating Nights', description: 'Family-friendly roller skating evenings', price: "£8", perTime: "night", location: 'City Skating Rink', schedule: 'Friday nights', contactInfo: 'rollerskating@example.com', requiredEquipment: 'Roller skates, safety pads'},
    { communityId: '20', title: 'SUP Yoga', description: 'Yoga on a stand-up paddleboard at the lake', price: "£18", perTime: "class", location: 'Lake Serene', schedule: 'Sunday mornings', contactInfo: 'supyoga@example.com', requiredEquipment: 'Yoga mat, paddleboard (rentals available)'}
  ];

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/homePage', (req, res) => {
    res.json(DATA);
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
