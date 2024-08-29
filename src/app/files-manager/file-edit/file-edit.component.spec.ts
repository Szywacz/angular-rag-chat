import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEditComponent } from './file-edit.component';

describe('FileEditComponent', () => {
  let component: FileEditComponent;
  let fixture: ComponentFixture<FileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
