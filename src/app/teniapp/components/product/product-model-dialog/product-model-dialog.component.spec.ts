import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelDialogComponent } from './product-model-dialog.component';

describe('ProductModelDialogComponent', () => {
  let component: ProductModelDialogComponent;
  let fixture: ComponentFixture<ProductModelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
