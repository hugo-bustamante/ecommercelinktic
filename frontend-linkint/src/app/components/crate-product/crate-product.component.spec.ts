import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateProductComponent } from './crate-product.component';

describe('CrateProductComponent', () => {
  let component: CrateProductComponent;
  let fixture: ComponentFixture<CrateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrateProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
