import Head from 'next/head';
import React from 'react';
import { DataContext } from '../context/DataContext';
import { Navbar } from '../ui';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DataContext>
            <Head>
                <title>Pokemon App</title>
                <meta name="description" content="Rusconi Roberto" />
            </Head>
            <Navbar />
            <main style={{ padding: '0px 20px' }}>{children}</main>
        </DataContext>
    );
};
