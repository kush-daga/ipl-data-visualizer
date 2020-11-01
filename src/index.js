import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/index.jsx";
import * as serviceWorker from "./serviceWorker";
import GlobalStyles from "./styles/globalStyles.js";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={() => <h1>Loading</h1>} persistor={persistor}>
			<GlobalStyles />
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
