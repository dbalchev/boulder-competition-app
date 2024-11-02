import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude, 'e2e/*'],
        environment: 'jsdom',
    },
    plugins: [react()],
})