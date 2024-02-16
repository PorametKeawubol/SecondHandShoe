import React from 'react';
import Header from '../Component/Header';

const styles = {

    centeredText: {
        textAlign: 'center',
        marginTop: '250px', // Adjust as needed
    },
};

function HomePage() {
    return (
        <div>
            <Header />
            <div style={styles.centeredText}>
                <p>BlaNK pAgE wAs HeRe</p>
            </div>
        </div>
    );
}

export default HomePage;
