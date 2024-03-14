import { IEvent } from '../event.interface';
import Papa from 'papaparse'

export function getJsonFromCsv(csv: string): IEvent[] {
    return Papa.parse(csv, {
        delimiter: ';',
        header: true,
    }).data.map((elt: any) => {
        const tab: string[] = Object.values(elt);
        return {
            id: tab[0],
            infoLink: tab[1],
            ticketLink: tab[1],
            title: tab[2],
            description: tab[4],
            startDate: tab[5],
            endDate: tab[6],
            flyer: tab[9],
            tags: tab[12],
            place: tab[13],
            address: tab[14],
            zipCode: tab[15],
            city: tab[16],
        }
    });
}
