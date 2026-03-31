/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import '@react-native/fantom/src/setUpDefaultReactNativeEnvironment';

import {HardwareBackPressEvent} from 'react-native/Libraries/Utilities/HardwareBackPressEvent';
import Event from 'react-native/src/private/webapis/dom/events/Event';

describe('HardwareBackPressEvent', () => {
  it('extends Event', () => {
    const event = new HardwareBackPressEvent(12345);

    expect(event).toBeInstanceOf(Event);
    expect(event.type).toBe('hardwareBackPress');
    expect(event.bubbles).toBe(false);
    expect(event.cancelable).toBe(false);
    expect(event.composed).toBe(false);
  });

  it('uses native timestamp as timeStamp when provided', () => {
    const event = new HardwareBackPressEvent(12345);

    expect(event.timeStamp).toBe(12345);
  });

  it('falls back to performance.now() when no timestamp is provided', () => {
    const before = performance.now();
    const event = new HardwareBackPressEvent();
    const after = performance.now();

    expect(event.timeStamp).toBeGreaterThanOrEqual(before);
    expect(event.timeStamp).toBeLessThanOrEqual(after);
  });

  it('falls back to performance.now() when timestamp is undefined', () => {
    const before = performance.now();
    const event = new HardwareBackPressEvent(undefined);
    const after = performance.now();

    expect(event.timeStamp).toBeGreaterThanOrEqual(before);
    expect(event.timeStamp).toBeLessThanOrEqual(after);
  });

  it('does NOT allow changing the timeStamp value after construction', () => {
    const event = new HardwareBackPressEvent(12345);

    expect(() => {
      'use strict';
      // $FlowExpectedError[cannot-write]
      event.timeStamp = 999;
    }).toThrow();
  });

  it('throws TypeError when constructed via public constructor', () => {
    const {
      HardwareBackPressEvent_public,
    } = require('react-native/Libraries/Utilities/HardwareBackPressEvent');

    expect(() => {
      // $FlowExpectedError[incompatible-new]
      return new HardwareBackPressEvent_public();
    }).toThrow(
      TypeError(
        "Failed to construct 'HardwareBackPressEvent': Illegal constructor",
      ),
    );
  });
});
