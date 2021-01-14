import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import client from './client';
import styled from 'styled-components';

let Root = styled.div`
	--main-text: #fff;
	--secondary-text: #dedede;
	--inactive-text: #aaa;
	--background: #060c0d;
	--foreground: #14191f;
	--background-main: #0e1216;
	--background-foreground-alt: #12171d;
	--main-button: #1669d6;
	--shadows: var(--background);

	background-color: var(--background);
	color: var(--main-text);
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	position: absolute;
`;

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Root>
				<App />
			</Root>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
