import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@api': path.resolve(import.meta.dirname, './src/api'),
			'@assets': path.resolve(import.meta.dirname, './src/assets'),
			'@components': path.resolve(import.meta.dirname, './src/components'),
			'@layout': path.resolve(import.meta.dirname, './src/components/layout'),
			'@shared': path.resolve(import.meta.dirname, './src/components/shared'),
			'@ui': path.resolve(import.meta.dirname, './src/components/ui'),
			'@config': path.resolve(import.meta.dirname, './src/config'),
			'@constants': path.resolve(import.meta.dirname, './src/constants'),
			'@hooks': path.resolve(import.meta.dirname, './src/hooks'),
			'@pages': path.resolve(import.meta.dirname, './src/pages'),
			'@routes': path.resolve(import.meta.dirname, './src/routes'),
			'@store': path.resolve(import.meta.dirname, './src/store'),
			'@app-types': path.resolve(import.meta.dirname, './src/types'),
			'@utils': path.resolve(import.meta.dirname, './src/utils'),
			'@styles': path.resolve(import.meta.dirname, './src/assets/styles')
		}
	}
})
