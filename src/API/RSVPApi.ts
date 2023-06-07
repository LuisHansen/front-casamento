import axios from 'axios';
import { RSVP_BASE_URL, RSVP_API_KEY } from '../conf';

export type Convidado = {
    _id: any;
    nome: string;
    confirmado: boolean;
    pagante: boolean;
}

export type Familia = {
    id: string;
    nome: string;
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
        const url = `${this.baseUrl}/get_familia?code=${RSVP_API_KEY}`;
        try {
            const response = await axios.get(url, {
                params: {
                    id: familyId,
                }
            });
            const familia: Familia = response.data[0];
            console.log('familia', familia, response.data);
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
        const url = `${this.baseUrl}/rsvp?code=${RSVP_API_KEY}`;
        try {
            await axios.post(url, data, {
                params: {
                    id: familyId,
                }
            });
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
