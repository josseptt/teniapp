import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandDialogComponent } from './product-brand-dialog.component';

describe('ProductBrandDialogComponent', () => {
  let component: ProductBrandDialogComponent;
  let fixture: ComponentFixture<ProductBrandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBrandDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
