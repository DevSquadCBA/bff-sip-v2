
type ConnectionOptions={
    host:string;
    user:string;
    password:string;
    database:string
}

export function createConnection(options:ConnectionOptions):Connection{
        return new Connection(options);
    }
export default class Connection{
    constructor(options:ConnectionOptions){
        console.log(`Created mocked connection with this options: ${options}`)
    }
    async query(q:string): Promise<unknown>{
        if(process.env.expectedResponse){
            return JSON.parse(process.env.expectedResponse);
        }
        return [];
    }
    destroy(){}
}