const places = [
 // { category: "Candlelight Restaurants", image: "https://source.unsplash.com/400x300/?candlelight,dinner", description: "Romantic dining experiences with intimate lighting." },
  //{ category: "Rooftop Restaurants", image: "https://source.unsplash.com/400x300/?rooftop,restaurant", description: "Dine under the stars with stunning skyline views." },
  { category: "Beachside Resorts", image: beach, description: "Relaxing coastal retreats for couples." },
  { category: "Luxury Spas", image: spa, description: "Pampering experiences for relaxation and romance." },
  { category: "Private Boat Rides", image: boat, description: "Enjoy a private cruise with breathtaking views." },
  { category: "Wine Tasting Tours", image: wine, description: "Sip and savor the finest wines together." },
  { category: "Hot Air Balloon Rides", image: wineww, description: "Experience romance soaring above stunning landscapes." },
 { category: "Luxury Cabins", image: beach22, description: "Escape to a cozy, secluded getaway." },

  //{ category: "Scenic Mountain Retreats", image: "https://source.unsplash.com/400x300/?mountain,romantic", description: "Stay in a breathtaking mountain resort." },
  // { category: "Sunset Beaches", image: "https://source.unsplash.com/400x300/?sunset,beach", description: "Walk hand-in-hand on the most beautiful beaches." },
  // { category: "Luxury Yacht Cruises", image: "https://source.unsplash.com/400x300/?yacht,romantic", description: "Sail in style on a private yacht." },
  // { category: "Secluded Islands", image: "https://source.unsplash.com/400x300/?island,romantic", description: "Escape to a private island for two." },
  // { category: "Garden Picnics", image: "https://source.unsplash.com/400x300/?picnic,romantic", description: "Enjoy a charming outdoor picnic in a scenic garden." },
  // { category: "Historical Castles", image: "https://source.unsplash.com/400x300/?castle,romantic", description: "Feel like royalty with a visit to a romantic castle." },
  // { category: "Horseback Riding Trails", image: "https://source.unsplash.com/400x300/?horseback,romantic", description: "Ride together through picturesque landscapes." },
  // { category: "Luxury Treehouses", image: "https://source.unsplash.com/400x300/?treehouse,romantic", description: "Stay in a beautifully designed treehouse for a magical getaway." },
  // { category: "Underwater Hotels", image: "https://source.unsplash.com/400x300/?underwater,romantic", description: "Sleep beneath the ocean in a unique underwater hotel." },
  // { category: "Snowy Mountain Chalets", image: "https://source.unsplash.com/400x300/?chalet,romantic", description: "Cozy up in a snowy mountain retreat." },
  // { category: "Private Beachfront Villas", image: "https://source.unsplash.com/400x300/?villa,romantic", description: "Enjoy an exclusive beachfront villa with breathtaking ocean views." }
];



/////////// hangout places:
// const placese = [
//   { category: "Restaurants", image: Rest, description: "Great places to enjoy delicious meals." },
//   { category: "Beaches", image: Beach, description: "Beautiful coastal areas for relaxation and fun." },
//   { category: "Art Gallary", image: Artgallary, description: "Cozy places to enjoy coffee and conversations." },
//   { category: "Parks", image: Park, description: "Relaxing green spaces for picnics and nature walks." },
//   { category: "Bars & Clubs", image: Bar, description: "Nightlife spots for music and drinks." },

//   { category: "Movie Theaters", image: mv2, description: "Watch the latest films in a comfortable setting." },
//   //{ category: "Art Galleries", image: "https://source.unsplash.com/400x300/?artgallery", description: "Explore creative artworks and exhibitions." },
//   { category: "Museums", image: mv, description: "Discover history and culture through exhibits." },
//   { category: "Zoo", image: tp, description: "See exotic animals up close." },
//   { category: "Botanical Gardens", image:gd, description: "Enjoy the beauty of diverse plant life." },
//   { category: "Theme Parks", image: tpark, description: "Thrilling rides and entertainment for all ages." },
//   { category: "Concert Halls", image: ch, description: "Live music and performances." },
//   { category: "Libraries", image: lib, description: "A peaceful place to read and study." },
//   { category: "Lakes & Rivers", image: lakes, description: "Great spots for fishing, boating, and relaxation." },
//   { category: "Ice Skating Rinks", image: lilll, description: "Fun activities for winter sports lovers." },
//   { category: "Ski Resorts", image: ski, description: "Hit the slopes for skiing and snowboarding." },
//   { category: "Mountain Trails", image: ma, description: "Hiking trails with scenic views." },
//   { category: "Spas", image: spa, description: "Relaxing treatments and massages." },
//   { category: "Bowling Alleys", image: bl, description: "A fun place for friendly competitions." },
//   //{ category: "Escape Rooms", image: "https://source.unsplash.com/400x300/?escaperoom", description: "Solve puzzles to escape in time." },
//   { category: "Arcades", image: arcades, description: "Enjoy classic and modern arcade games." },
//   { category: "Sports Arenas", image: sportAr, description: "Watch your favorite teams in action." },
//   { category: "Golf Courses", image: sss, description: "Play a relaxing round of golf." },
//   { category: "Camping Sites", image: camping, description: "Escape into nature for a night under the stars." },
//   { category: "Wine Tasting Tours", image: wine, description: "Sip and savor fine wines." },
//   { category: "Car Shows", image: carshows, description: "Admire classic and luxury cars." },
//   // { category: "Skydiving Centers", image: "https://source.unsplash.com/400x300/?skydiving", description: "Experience the thrill of free-fall." },
//   // { category: "Hot Air Balloon Rides", image: "https://source.unsplash.com/400x300/?hotairballoon", description: "Enjoy breathtaking aerial views." },
//   // { category: "Karaoke Bars", image: "https://source.unsplash.com/400x300/?karaoke", description: "Sing your heart out with friends." },
//   // { category: "Go-Kart Racing", image: "https://source.unsplash.com/400x300/?gokart", description: "Speed around the track for fun." },
//   // { category: "Paintball Arenas", image: "https://source.unsplash.com/400x300/?paintball", description: "Engage in thrilling paintball battles." },
//   // { category: "Trampoline Parks", image: "https://source.unsplash.com/400x300/?trampoline", description: "Jump and flip in an exciting environment." },
//   // { category: "Escape Cruises", image: "https://source.unsplash.com/400x300/?cruise", description: "Relax and explore on a luxury cruise." },
//   // { category: "Fishing Trips", image: "https://source.unsplash.com/400x300/?fishing", description: "Enjoy a peaceful day of fishing." },
//   // { category: "Rock Climbing Gyms", image: "https://source.unsplash.com/400x300/?rockclimbing", description: "Challenge yourself with indoor climbing." },
//   // { category: "Water Parks", image: "https://source.unsplash.com/400x300/?waterpark", description: "Splash around in wave pools and slides." }
// ];










