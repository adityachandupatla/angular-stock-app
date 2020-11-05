export class ServiceUrl {
    public static searchUrl: string = 'http://localhost:3000/stock/api/v1.0/search?query=';
    public static outlookUrl: string = 'http://localhost:3000/stock/api/v1.0/outlook/';
    public static summaryUrl: string = 'http://localhost:3000/stock/api/v1.0/summary/';
    // Needs startDate and resampleFreq
    public static historicalUrl: string = 'http://localhost:3000/stock/api/v1.0/historical/';
    // Needs startDate and resampleFreq
    public static dailyUrl: string = 'http://localhost:3000/stock/api/v1.0/daily/';
    public static newsUrl: string = 'http://localhost:3000/stock/api/v1.0/news/';
}