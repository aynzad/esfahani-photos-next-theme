import '@testing-library/jest-dom/extend-expect'

jest.mock('@prismicio/next', () => {
  enableAutoPreviews: () => ({})
})
