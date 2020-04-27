import { Country } from '../app/country';

export const COUNTRIES: Country[] = [
    {
        id: 'cn',
        name: 'China',
        region: 'East Asia',
        daysCycled: 104,
        distanceCycled: 5500,
        averageDailySpend: 25,
        favouritePlace: "Xinjiang",
        igStory: 17981117905040928,
        color: '#f44336',
        dateLeft: new Date(2018, 6, 4),
    	score: [4, 3, 3, 3, 2],
	},
    {
        id: 'kz',
        name: 'Kazakhstan',
        region: 'Central Asia',
        daysCycled: 14,
        distanceCycled: 600,
        averageDailySpend: 18,
        favouritePlace: "Almaty",
        igStory: 17981973844050067,
        color: '#009688',
        dateLeft: new Date(2018, 6, 19),
    	score: [4, 3, 3, 3, 4],
	},
    {
        id: 'kg',
        name: 'Kyrgyzstan',
        region: 'Central Asia',
        daysCycled: 39,
        distanceCycled: 1500,
        averageDailySpend: 15,
        favouritePlace: "Moldo-Ashuu Pass",
        igStory: 17864517859282762,
        color: '#009688',
        dateLeft: new Date(2018, 7, 27),
    	score: [3, 3, 5, 4, 5],
	},
    {
        id: 'tj',
        name: 'Tajikistan',
        region: 'Central Asia',
        daysCycled: 44,
        distanceCycled: 1350,
        averageDailySpend: 12,
        favouritePlace: "Lake Iskanderkul",
        igStory: 17872834954284943,
        color: '#009688',
        dateLeft: new Date(2018, 9, 10),
    	score: [5, 3, 5, 4, 5],
	},
    {
        id: 'uz',
        name: 'Uzbekistan',
        region: 'Central Asia',
        daysCycled: 14,
        distanceCycled: 550,
        averageDailySpend: 10,
        favouritePlace: "Bukhara",
        igStory: 17917294267245938,
        color: '#009688',
        dateLeft: new Date(2018, 9, 25),
    	score: [5, 4, 3, 5, 4],
	},
    {
        id: 'tm',
        name: 'Turkmenistan',
        region: 'Central Asia',
        daysCycled: 4,
        distanceCycled: 130,
        averageDailySpend: 5,
        igStory: 17888999020279256,
        color: '#009688',
        dateLeft: new Date(2018, 9, 29),
    	score: [5, 3, 3, 4, 4],
	},
    {
        id: 'ir',
        name: 'Iran',
        region: 'Middle East',
        daysCycled: 120,
        distanceCycled: 4565,
        averageDailySpend: 6.50,
        favouritePlace: "Kashan",
        igStory: 17937173983260990,
        color: '#fdd835',
        dateLeft: new Date(2019, 1, 26),
    	score: [4, 2, 3, 5, 4],
	},
    {
        id: 'kd',
        name: 'Iraq Kurdistan',
        region: 'Middle East',
        daysCycled: 20,
        distanceCycled: 421,
        averageDailySpend: 7,
        favouritePlace: "Lalish",
        igStory: 18002745499196044,
        color: '#fdd835',
        dateLeft: new Date(2019, 2, 18),
    	score: [4, 3, 4, 2, 4],
	},
    {
        id: 'tr',
        name: 'Turkey',
        region: 'Middle East',
        daysCycled: 89,
        distanceCycled: 2650,
        averageDailySpend: 20,
        favouritePlace: "Cappadocia",
        igStory: 18054776278020770,
        color: '#fdd835',
        dateLeft: new Date(2019, 5, 15),
    	score: [4, 3, 4, 4, 4],
	},
    {
        id: 'bg',
        name: 'Bulgaria',
        region: 'Europe',
        daysCycled: 61,
        distanceCycled: 740,
        averageDailySpend: 12.2,
        favouritePlace: "Plovdiv",
        igStory: 18071568355069625,
        color: '#553a99',
        dateLeft: new Date(2019, 7, 19),
    	score: [4, 3, 4, 4, 5],
	},
    {
        id: 'rs',
        name: 'Serbia',
        region: 'Europe',
        daysCycled: 9,
        distanceCycled: 343,
        averageDailySpend: 9.5,
        favouritePlace: "Vrnjacka Banja",
        igStory: 17888894407380738,
        color: '#553a99',
        dateLeft: new Date(2019, 7, 25),
    	score: [4, 3, 4, 4, 4],
	},
    {
        id: 'ba',
        name: 'Bosnia and Herzegovina',
        region: 'Europe',
        daysCycled: 39,
        distanceCycled: 680,
        averageDailySpend: 15,
        favouritePlace: "Rakatnica",
        igStory: 17957541127292758,
        color: '#553a99',
        dateLeft: new Date(2019, 9, 3),
    	score: [3, 3, 4, 4, 3],
	},
    {
        id: 'hr',
        name: 'Croatia and Slovenia',
        region: 'Europe',
        daysCycled: 4,
        distanceCycled: 233,
        averageDailySpend: 4,
        favouritePlace: "Adriatic Sea",
        igStory: 17916199729348383,
        color: '#553a99',
        dateLeft: new Date(2019, 9, 6),
    	// score: [],
	},
    {
        id: 'it',
        name: 'Italy',
        region: 'Europe',
        daysCycled: 14,
        distanceCycled: 720,
        averageDailySpend: 10.5,
        favouritePlace: "Vicenza",
        igStory: 17872907794470767,
        color: '#553a99',
        dateLeft: new Date(2019, 9, 20),
    	// score: [],
	},
    {
        id: 'fr',
        name: 'France',
        region: 'Europe',
        daysCycled: 12,
        distanceCycled: 660,
        averageDailySpend: 8.75,
        favouritePlace: "French Riviera",
        igStory: 18086182084119543,
        color: '#553a99',
        dateLeft: new Date(2019, 10, 1),
    	// score: [],
	},
    {
        id: 'es',
        name: 'Spain',
        region: 'Europe',
        daysCycled: 31,
        distanceCycled: 1350,
        averageDailySpend: 16.4,
        favouritePlace: "Murcia",
        igStory: 18092162683101184,
        color: '#553a99',
        dateLeft: new Date(2019, 10, 29),
    	// score: [],
	},
    {
        id: 'pt',
        name: 'Portugal',
        region: 'Europe',
        daysCycled: 10,
        distanceCycled: 450,
        averageDailySpend: 11.5,
        favouritePlace: "Lisbon",
        igStory: 17863750252582398,
        color: '#553a99',
        dateLeft: new Date(2019, 11, 7),
        // score: [],
    }
  ];