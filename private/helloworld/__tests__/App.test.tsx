/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import App from '../App';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {AuthProvider, useAuth} from '../AuthContext';

/** Helper component that captures the current auth context value for assertions. */
let capturedAuthValue: ReturnType<typeof useAuth> | null = null;
function TestAuthCapture(): React.ReactNode {
  capturedAuthValue = useAuth();
  return null;
}

beforeEach(() => {
  capturedAuthValue = null;
});

test('renders login screen when unauthenticated', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });
  const json = renderer.toJSON();
  expect(JSON.stringify(json)).toContain('Sign In');
});

test('AuthProvider provides login and logout', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <AuthProvider>
        <TestAuthCapture />
      </AuthProvider>,
    );
  });

  expect(capturedAuthValue!.isAuthenticated).toBe(false);
  expect(capturedAuthValue!.user).toBeNull();

  // Simulate a successful login
  let loginResult: boolean = false;
  await ReactTestRenderer.act(async () => {
    loginResult = await capturedAuthValue!.login('alice', 'secret');
  });

  expect(loginResult).toBe(true);
  expect(capturedAuthValue!.isAuthenticated).toBe(true);
  expect(capturedAuthValue!.user).toBe('alice');

  // Simulate logout
  await ReactTestRenderer.act(() => {
    capturedAuthValue!.logout();
  });

  expect(capturedAuthValue!.isAuthenticated).toBe(false);
  expect(capturedAuthValue!.user).toBeNull();
});

test('login fails when credentials are empty', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <AuthProvider>
        <TestAuthCapture />
      </AuthProvider>,
    );
  });

  let loginResult: boolean = true;
  await ReactTestRenderer.act(async () => {
    loginResult = await capturedAuthValue!.login('', '');
  });

  expect(loginResult).toBe(false);
  expect(capturedAuthValue!.isAuthenticated).toBe(false);
});

test('renders home screen after login', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <AuthProvider>
        <TestAuthCapture />
        <App />
      </AuthProvider>,
    );
  });

  await ReactTestRenderer.act(async () => {
    await capturedAuthValue!.login('bob', 'pass');
  });

  const json = renderer.toJSON();
  expect(JSON.stringify(json)).toContain('bob');
});
