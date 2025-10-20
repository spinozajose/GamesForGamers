// setupTests.js
import '@testing-library/jest-dom';

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock para IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock para ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock para CSS imports
vi.mock('*.css', () => ({}));
vi.mock('bootstrap/dist/css/bootstrap.min.css', () => ({}));

// Mock global para localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock para sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock para alert (necesario para Checkout)
global.alert = vi.fn();

// Mock para window.scrollTo
global.scrollTo = vi.fn();

// Mock para console.errors en tests
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (
        args[0].includes('ReactDOM.render is no longer supported') ||
        args[0].includes('validateDOMNesting') ||
        args[0].includes('Not implemented: window.alert') ||
        args[0].includes('Not implemented: window.scrollTo') ||
        args[0].includes('useNavigate') ||
        args[0].includes('useLocation')
      )
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (
        args[0].includes('React does not recognize the') ||
        args[0].includes('validateDOMNesting') ||
        args[0].includes('useNavigate')
      )
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };

  // Silenciar console.log en tests
  console.log = vi.fn();
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
});

// Limpiar mocks entre tests
beforeEach(() => {
  vi.clearAllMocks();
  
  // Reset de localStorage mock entre tests
  localStorageMock.getItem.mockImplementation(() => null);
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  // Reset de sessionStorage
  sessionStorageMock.getItem.mockImplementation(() => null);
  sessionStorageMock.setItem.mockClear();
  sessionStorageMock.removeItem.mockClear();
  sessionStorageMock.clear.mockClear();
  
  // Reset de alert
  global.alert.mockClear();
  
  // Reset de scrollTo
  global.scrollTo.mockClear();
});

// Mock para elementos que podrían faltar
Object.defineProperty(window, 'print', {
  writable: true,
  value: vi.fn(),
});

// Mock para URL.createObjectURL si es necesario
URL.createObjectURL = vi.fn();

// Mock para requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id));