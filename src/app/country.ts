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
     * 5 star score on 5 criteria: 
     * Landscape and Nature
     * People and Culture
     * Infrastructure, Safety and Politics
     * Value for Money
     * Camping and Outdoor Living
     */
    score: number[];
}
