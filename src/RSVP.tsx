import React, { useState } from 'react';
import { rsvpApi } from './API/RSVPApi';
import type { Familia, Convidado } from './API/RSVPApi';

import './styles/rsvp.css';

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

    const onClickConvidado = (convidado: Convidado, e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const convidadoIndex = familia.convidados.indexOf(convidado);
        const newFamilia = { ...familia };
        newFamilia.convidados[convidadoIndex] = { ...convidado, confirmado: !convidado.confirmado };
        setFamilia(newFamilia);
    };

    const onSaveGuests = async () => {
        setState(RsvpState.Loading);
        const confirmar = [];
        const desconfirmar = [];

        familia.convidados.forEach(convidado => {
            if (convidado.confirmado) {
                confirmar.push(convidado._id);
            } else {
                desconfirmar.push(convidado._id);
            }
        });

        const apiResponse = await rsvpApi.postRsvp(familia.id, {
            confirmar,
            desconfirmar,
        });
        if (apiResponse.status === 200) {
            setState(RsvpState.GuestsSaved);
        } else {
            setState(RsvpState.Error);
        }
    }

    const resetState = async () => {
        setState(RsvpState.Initial);
    }

    const buscarFamilia = async () => {
        setState(RsvpState.Loading);
        const codigoSanitizado = codFamilia.normalize("NFD").replace(/\p{Diacritic}|,/gu, "").toUpperCase();
        const resposta = await rsvpApi.getRsvp(codigoSanitizado);
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
                    <p>Digite o nome da família exatamente</p>
                    <p>como está no verso do convite</p>
                    <input type="text" value={codFamilia} onChange={e => setCodFamilia(e.target.value)}/>
                    <button id="buscar_familia" onClick={buscarFamilia}>Buscar</button>
                </div>
            )}
            {state === RsvpState.ConfirmingGuests && (
                <div className="guest_confirm_form">
                    <p>Selecione os convidados que comparecerão:</p>
                    <div className="guest_list">
                        {familia.convidados.map(convidado => (
                            <div
                                className="checkbox"
                                key={convidado._id}
                                onClick={(e) => onClickConvidado(convidado, e)}
                            >
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" className="checkbox-input" checked={convidado.confirmado} onChange={() => false}/>
                                    <span className="checkbox-tile">
                                        <span className="checkbox-label">{convidado.nome}</span>
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button id="salvar_familia" className="guest_save" onClick={onSaveGuests}>Salvar</button>
                </div>
            )}
            {state === RsvpState.Loading && (
                <span className="loader" />
            )}
            {state === RsvpState.NotFound && (
                <div className="family_not_found">
                    <p>Humm, não encontramos sua família com esse nome!</p>
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
            {state === RsvpState.GuestsSaved && (
                <div className="saved">
                    <h2>Tudo certo!</h2>
                    <p>Suas informações foram salvas!</p>
                    <p>Se quiser, pode editar depois! É só voltar aqui e digitar o mesmo nome de família!</p>
                </div>
            )}
        </div>
    );
}
