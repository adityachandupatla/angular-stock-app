import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceUrl } from '../common/ServiceUrl';
import { OutlookModel } from '../models/OutlookModel';
import { forkJoin, Observable, of } from 'rxjs';
import { SummaryModel } from '../models/SummaryModel';
import { NewsModel } from '../models/NewsModel';
import { DetailsModel } from '../models/DetailsModel';
import { concatMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DetailsService {

    detailsModel: DetailsModel;

    constructor(private _http: HttpClient) { }

    getDetails(ticker: string): Observable<DetailsModel> {
        return forkJoin(
            {
                outlookModel: this._http.get<OutlookModel>(ServiceUrl.outlookUrl + ticker),
                summaryModel: this._http.get<SummaryModel>(ServiceUrl.summaryUrl + ticker),
                newsModel: this._http.get<NewsModel>(ServiceUrl.newsUrl + ticker)
            }
        ).pipe(
            concatMap(result => {
                this.detailsModel = new DetailsModel();
                this.detailsModel.outlookModel = result.outlookModel;
                this.detailsModel.summaryModel = result.summaryModel;
                this.detailsModel.newsModel = result.newsModel;
                return of(this.detailsModel);
            })
        );
    }
}
