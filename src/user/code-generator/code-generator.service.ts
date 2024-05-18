import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class CodeGeneratorService {
    constructor(private readonly httpService: HttpService) { }

    generateCode(): Observable<string> {
        return this.httpService.post(this.getURL(), this.getBody()).pipe(
            map(response => {
                return this.getCode(response.data);
            })
        );
    }

    private getURL(): string {
        return `${process.env.WAPI_ADRESS}?key=${process.env.WAPI_KEY}&q=bulk`;
    }

    private getBody(): JSON {
        const sBody = `{"locations":[ 
            {"q": "${process.env.WAPI_CITY1}"}, 
            {"q": "${process.env.WAPI_CITY2}"}, 
            {"q": "${process.env.WAPI_CITY3}"} 
        ] }`
        return JSON.parse(sBody);
    }

    private getCode(data: any): string {
        let tempC = new Array('', '', '');
        for (let i in tempC) {
            tempC[i] = data.bulk[i].query.current.temp_c
        }

        tempC = tempC.map(t => {
            t = Math.trunc(Math.abs(+t)).toString();
            t = t.padStart(2, "0").substring(0, 2);
            return t;
        })

        return tempC.join("");
    }
}
