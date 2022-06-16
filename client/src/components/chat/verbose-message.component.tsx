import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Verbose } from '../../class/chat.class';
import { IStoreStates } from '../../interfaces/store.interface';
import HelpMessageComponent from './help-message.component';

interface IProps {
    id: number;
}

const VerboseMessageComponent = ({ id }: IProps) => {
    const verbose = useSelector((state: IStoreStates) => state.chat.data[id] as Verbose);
    const { t } = useTranslation();
    if (verbose.category === 'Help') return <HelpMessageComponent />;
    return (
        <div className={`${verbose.type} ${verbose.category} message`}>
            <span className="content">{t(`log.${verbose.category}`, verbose.options)}</span>
        </div>
    );
};

export default VerboseMessageComponent;
