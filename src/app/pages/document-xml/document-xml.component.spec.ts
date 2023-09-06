import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentXmlComponent } from './document-xml.component';

describe('DocumentXmlComponent', () => {
  let component: DocumentXmlComponent;
  let fixture: ComponentFixture<DocumentXmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentXmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
