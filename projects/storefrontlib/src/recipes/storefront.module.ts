import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  ExternalRoutesModule,
  OccModule,
  PersonalizationModule,
  provideConfig,
  SiteContextModule,
} from '@spartacus/core';
import { AsmModule } from '../cms-components/asm/asm.module';
import { ProductDetailsPageModule } from '../cms-pages/product-details-page/product-details-page.module';
import { ProductListingPageModule } from '../cms-pages/product-listing-page/product-listing-page.module';
import { MainModule } from '../layout/main/main.module';
import { StorefrontConfig } from '../storefront-config';
import { StorefrontFoundationModule } from './storefront-foundation.module';

/**
 * @deprecated since 3.1, see https://sap.github.io/spartacus-docs/getting-started/reference-app-structure
 */
@NgModule({
  imports: [
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected',
      initialNavigation: 'enabled',
    }),

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    // ASM module must be imported before the `AuthModule (which is imported in `StorefrontFoundationModule`)
    // since we might have conflicting interceptor logic. See #5461.
    AsmModule,

    StorefrontFoundationModule,
    MainModule,
    SiteContextModule.forRoot(), // should be imported after RouterModule.forRoot, because it overwrites UrlSerializer

    PersonalizationModule.forRoot(), // should be custom

    // opt-in explicitly
    OccModule.forRoot(),
    ProductDetailsPageModule,
    ProductListingPageModule,
    ExternalRoutesModule.forRoot(),
  ],
  exports: [MainModule, StorefrontFoundationModule],
})
export class StorefrontModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<StorefrontModule> {
    return {
      ngModule: StorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
