import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceUrl } from '../common/ServiceUrl';
import { OutlookModel } from '../models/OutlookModel';
import { forkJoin, Observable, of } from 'rxjs';
import { SummaryModel } from '../models/SummaryModel';
import { NewsModel } from '../models/NewsModel';
import { DetailsModel } from '../models/DetailsModel';
import { concatMap } from 'rxjs/operators';
import { StockInfoModel } from '../models/StockInfoModel';


@Injectable({
    providedIn: 'root'
})
export class DetailsService {

    detailsModel: DetailsModel;

    constructor(private _http: HttpClient) { }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    getDetails(ticker: string): Observable<DetailsModel> {
        let twoYearAgoDate = new Date().setFullYear(new Date().getFullYear() - 2);
        let startDate = this.formatDate(twoYearAgoDate);
        return forkJoin(
            {
                outlookModel: this._http.get<OutlookModel>(ServiceUrl.outlookUrl + ticker),
                summaryModel: this._http.get<SummaryModel>(ServiceUrl.summaryUrl + ticker),
                newsModel: this._http.get<NewsModel>(ServiceUrl.newsUrl + ticker),
                historicalModel: this._http.get<StockInfoModel>(ServiceUrl.historicalUrl + ticker + "?startDate=" + startDate)
            }
        ).pipe(
            concatMap(result => {
                this.detailsModel = new DetailsModel();
                this.detailsModel.outlookModel = result.outlookModel;
                this.detailsModel.summaryModel = result.summaryModel;
                this.detailsModel.newsModel = result.newsModel;
                this.detailsModel.historicalStockInfo = result.historicalModel;
                return of(this.detailsModel);
            })
        );
    }
}
