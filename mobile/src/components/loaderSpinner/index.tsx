import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Animated } from 'react-native';


const LoaderSpinner = () => {
    return (
        <Container>
            <ActivityIndicator size="large" color="white"/>
        </Container>
    );
}
const Container = styled.TouchableOpacity`
    flex: 1;
    margin-top: 50px;
`;

export default LoaderSpinner;