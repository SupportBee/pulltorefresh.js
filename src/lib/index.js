import _ptr from './api';
import _shared from './shared';
import _setupEvents from './events';
import _setupHandler from './setup';

// public API
export default {
  setPassiveMode(isPassive) {
    _shared.passive = isPassive;
  },
  setPointerEventsMode(isEnabled) {
    _shared.pointerEventsEnabled = isEnabled;
  },
  destroyAll() {
    if (_shared.events) {
      _shared.events.destroy();
      _shared.events = null;
    }

    while (_shared.handlers.length) {
      _shared.handlers[0].destroy();
    }
  },
  init(options = {}) {
    const handler = _setupHandler(options);

    _shared.handlers.push(handler);

    return handler;
  },

  // export utils for testing
  _: {
    setupHandler: _setupHandler,
    setupEvents: _setupEvents,
    setupDOM: _ptr.setupDOM,
    onReset: _ptr.onReset,
    update: _ptr.update,
  },
};
