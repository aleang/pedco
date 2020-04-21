export class Country {
    id: string;
    name: string;
    region: string;
    daysCycled: number;
    distanceCycled: number;
    averageDailySpend: number;
    favouritePlace?: string;
    igStory: number;
    color: string;
    
    /**
     * Date left the country to display in the chart 
     * the distance covered. Due to Google Chart's date format, 
     * months start at 0 (January is 0, Dec is 11)
     */
    dateLeft?: Date;

    /**
     * Five stars scoring based on five criteria: 
     * 1. People and Culture
     * 2. Infrastructure, Safety and Politics
     * 3. Landscape and Nature
     * 4. Value for Money
     * 5. Camping and Outdoor Living
     */
    score?: number[];
}
