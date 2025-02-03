import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TimelineComponent } from './timeline/timeline.component';

export const routes: Routes = [
    {
        path: "", component: HomeComponent
    },
    {
        path: "home", component: HomeComponent
    },
    {
        path: "statistics", component: StatisticsComponent
    },
    {
        path: "timeline", component: TimelineComponent
    },
    {
        path: "**", component: HomeComponent
    }
];
