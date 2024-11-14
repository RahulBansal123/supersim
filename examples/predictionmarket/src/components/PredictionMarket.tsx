import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { useMarkets } from '../hooks/useMarkets';

import Connect from './Connect';
import Header from './Header';
import Markets from './Markets';
import Positions from './Positions';

const PredictionMarket: React.FC = () => {
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    const { markets } = useMarkets();

    const [activeTab, setActiveTab] = useState<'markets' | 'positions'>('markets');

    if (!isConnected) {
        return (
            <div style={styles.app}>
                <Connect onConnect={() => connect({ connector: connectors[0] })} />
            </div>
        )
    }

    const renderMain = () => {
        switch (activeTab) {
            case 'markets':
                return <Markets markets={markets} />;
            case 'positions':
                return <Positions markets={markets} />;
        }
    }

    return (
        <div style={styles.app}>
        <header style={styles.header}>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        </header>
        <main style={styles.main}>
            {renderMain()}
        </main>
        </div>
    )
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100vh',
        width: '100%',
        backgroundColor: '#F2F3F8',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        height: '10%'
    },
    main: {
        alignSelf: 'center',
        width: '90%',
    }
}
       

export default PredictionMarket;