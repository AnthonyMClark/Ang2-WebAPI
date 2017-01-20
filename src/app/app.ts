export class App {
    constructor(
        public CaseNo: string, 
        public SSN: number, 
        public DOB: string, 
        public CaseFirst: string, 
        public CaseLast: string, 
        public Street: string, 
        public City: string, 
        public State: string, 
        public Zip: number, 
        public HomePhone: string, 
        public MobilePhone: string, 
        public TextPhone: string, 
        public Email: string, 
        public BCW: string, 
        public ARFirst: string, 
        public ARLast: string, 
        public ActivityID: number,
        public Indicators: Indicators[],
        public Username: string
    ) {}
}
export class Indicators {
    constructor(public Name: string, public IsActive: boolean){}
}