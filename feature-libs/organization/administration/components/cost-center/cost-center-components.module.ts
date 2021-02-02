import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { BudgetDetailsCellModule } from '../budget/details-cell/details-cell.module';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { CostCenterBudgetListModule } from './budgets/cost-center-budget-list.module';
import {
  costCenterCmsConfig,
  costCenterRoutingConfig,
  costCenterTableConfigFactory,
} from './cost-center.config';
import { CostCenterDetailsModule } from './details/cost-center-details.module';
import { CostCenterFormModule } from './form/cost-center-form.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    CostCenterDetailsModule,
    CostCenterFormModule,
    CostCenterBudgetListModule,
    BudgetDetailsCellModule,
  ],
  providers: [
    provideDefaultConfig(costCenterRoutingConfig),
    provideDefaultConfig(costCenterCmsConfig),
    provideDefaultConfigFactory(costCenterTableConfigFactory),
  ],
})
export class CostCenterComponentsModule {}
