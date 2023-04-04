import axios from 'axios';
import { RSVP_BASE_URL } from '../conf';

type Convidado = {
    _id: any;
    nome: string;
    confirmado: boolean;
    pagante: boolean;
}

export type Familia = {
    id: string;
    convidados: Convidado[];
}

interface IGetRsvpResponse {
    error?: any;
    familia: Familia | null;
}

interface IRsvpPostData {
    confirmar?: string[],
    desconfirmar?: string[],
}

interface IRsvpPostResponse {
    status: number;
}

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

class RSVPApi {
    baseUrl = RSVP_BASE_URL;

    async getRsvp(familyId: string): Promise<IGetRsvpResponse> {
        const url = `${this.baseUrl}/rsvp/${familyId}`;
        try {
            const response = await axios.get(url);
            const familia: Familia = response.data[0];
            console.log('familia', familia);
            return {
                familia,
            };
        } catch (err) {
            console.log(err);
            return {
                error: err,
                familia: null,
            };
        }
    }

    async postRsvp(familyId: string, data: IRsvpPostData): Promise<IRsvpPostResponse> {
        const url = `${this.baseUrl}/rsvp/${familyId}`;
        try {
            await axios.post(url, data);
            return {
                status: 200,
            };
        } catch (err) {
            console.log(err);
            return {
                status: 500,
            };
        }
    }
}

export const rsvpApi = new RSVPApi();
