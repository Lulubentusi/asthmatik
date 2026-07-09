import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('reads default player/team/goal', () => {
    const app = TestBed.createComponent(AppComponent).componentInstance;
    expect(app.team).toBe('ados');
    expect(app.playerIndex).toBeGreaterThanOrEqual(1);
    expect(app.goal).toBe(30);
  });
});
