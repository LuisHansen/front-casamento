import { useState } from 'react';
import { rsvpApi } from './API/RSVPApi';
import type { Familia } from './API/RSVPApi';

enum RsvpState {
    Initial,
    Loading,
    ConfirmingGuests,
    GuestsSaved,
    NotFound,
    Error,
}

export const RSVP: React.FC = () => {
    const [state, setState] = useState<RsvpState>(RsvpState.Initial);
    const [codFamilia, setCodFamilia] = useState('');
    const [familia, setFamilia] = useState<Familia>(null);

    const resetState = async () => {
        setState(RsvpState.Initial);
    }

    const buscarFamilia = async () => {
        setState(RsvpState.Loading);
        const resposta = await rsvpApi.getRsvp(codFamilia);
        if (resposta.error) {
            setState(RsvpState.Error);
            return;
        }
        if (!resposta.familia) {
            setState(RsvpState.NotFound);
            return;
        }
        setFamilia(resposta.familia);
        setState(RsvpState.ConfirmingGuests);
    }

    return (
        <div className="rsvp">
            {state === RsvpState.Initial && (
                <div className="initial_form">
                    <p>Qual o código da família?</p>
                    <input type="text" value={codFamilia} onChange={e => setCodFamilia(e.target.value)}/>
                    <button onClick={buscarFamilia}>OK</button>
                </div>
            )}
            {state === RsvpState.ConfirmingGuests && (
                <div className="guest_confirm_form">
                    <div className="guest_list">
                        {familia.convidados.map(convidado => (
                            <div className="guest_profile" key={convidado._id}>
                                <div className="name">{convidado.nome}</div>
                                <div className="confirmation_state">{convidado.confirmado}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {state === RsvpState.Loading && (
                <div className="loader" />
            )}
            {state === RsvpState.NotFound && (
                <div className="family_not_found">
                    <p>Vish, não encontramos sua família com esse código!</p>
                    <p>Pode conferir se digitou certinho?</p>
                    <p>Se não funcionar, por favor entre em contato com o Luís em (11) 94123-7636!</p>
                    <button onClick={resetState}>Tentar de novo</button>
                </div>
            )}
            {state === RsvpState.Error && (
                <div className="error">
                    <p>Putz, alguma coisa deu errado!</p>
                    <p>Você pode tentar de novo daqui a uns 2 minutinhos, por favor?</p>
                    <p>Se não funcionar, por favor entre em contato com o Luís em (11) 94123-7636!</p>
                    <button onClick={resetState}>Tentar de novo</button>
                </div>
            )}
        </div>
    );
}
