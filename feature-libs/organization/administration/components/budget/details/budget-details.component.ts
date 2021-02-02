import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { BudgetItemService } from '../services/budget-item.service';

@Component({
  selector: 'cx-org-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: BudgetItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class BudgetDetailsComponent implements OnInit {
  model$: Observable<Budget>;
  isInEditMode$ = this.itemService.isInEditMode$;

  @Input() something: any;

  ngOnInit() {
    this.model$ = of(this.something).pipe(
      // this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      startWith({})
    );
  }

  constructor(protected itemService: ItemService<Budget>) {}
}
