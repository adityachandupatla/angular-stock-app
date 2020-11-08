export class PortfolioModel {
    ticker: string;
    companyName: string;
    quantity: number;
    avgCostPerShare: number;
    totalCost: number;
    change: number;
    currentPrice: number;
    marketValue: number;
    changed: boolean;
    isPositive: boolean;
}