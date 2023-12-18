import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

const middlewareEnhancer = applyMiddleware(thunk)

// const store = configureStore({
//   reducer: rootReducer,
// });

const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer))

// const store = configureStore({
//     reducer: {
//     //   posts: postReducer,
//     rootReducer
//     },
//     middleware: [thunk],
//   });

export default store;
