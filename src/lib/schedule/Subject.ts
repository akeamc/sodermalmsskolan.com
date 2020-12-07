export class Subject {
  public name: string;

  public color: string;

  private _symbol?: string;

  constructor(name: string, color: string, symbol?: string) {
    this.name = name;
    this.color = color;
    this._symbol = symbol;
  }

  public get symbol(): string {
    return this._symbol || this.name.substring(0, 2).toUpperCase();
  }
}

export const Subjects: { [subjectName: string]: Subject } = {
  Mathematics: new Subject("Matematik", "#0070f3"),
  Swedish: new Subject("Svenska", "#ffeb3b"),
  English: new Subject("Engelska", "#f44336"),
  SocialStudies: new Subject("Religion", "#795548"),
  Physics: new Subject("Fysik", "#4caf50"),
  Chemistry: new Subject("Kemi", "#4caf50"),
  Biology: new Subject("Biologi", "#4caf50"),
  Music: new Subject("Musik", "#673ab7"),
  Gastronomy: new Subject("Hem- och konsumentkunskap", "#E91E63", "HKK"),
  Engineering: new Subject("Teknik", "#4caf50"),
  HardCrafts: new Subject("Trä- och metallslöjd", "#009688", "TM"),
  SoftCrafts: new Subject("Textilslöjd", "#009688", "TX"),
  Sports: new Subject("Idrott", "#009688", "IDH"),
  German: new Subject("Tyska", "#ff9800"),
  French: new Subject("Franska", "#ff9800"),
  Spanish: new Subject("Spanska", "#ff9800"),
  Random: new Subject("Mentorstid", "#607d8b", "MT"),
};
