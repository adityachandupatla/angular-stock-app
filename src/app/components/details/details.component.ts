import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    ticker: string;
    showSpinner: boolean;

    constructor(private route: ActivatedRoute,
        private detailsService: DetailsService) { }

    ngOnInit(): void {
        this.showSpinner = true;
        this.ticker = this.route.snapshot.paramMap.get('ticker');
        this.detailsService.getDetails(this.ticker).subscribe(result => {
            console.log(result);
            this.showSpinner = false;
        });
    }

}
