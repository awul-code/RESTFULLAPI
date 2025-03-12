// Pastikan package.json Anda sudah memiliki "type": "module"
export default [
    // 1. Konfigurasi untuk mengabaikan file dan folder tertentu
    {
        // Gunakan properti "ignores" untuk menentukan pola file yang akan diabaikan
        ignores: [
            'node_modules/**',
            'build/**',
            'public/**',
            '**/tsconfig.json',
            'eslint.config.js' // Abaikan file konfigurasi ESLint itu sendiri
        ]
    },
    // 2. Konfigurasi utama untuk file sumber di folder "src/"
    {
        // Batasi linting hanya untuk file di dalam folder "src"
        files: ['src/**/*.{js,ts,jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 12, // ES2021 / ECMAScript 12
            sourceType: 'module',
            // Menggunakan parser dari @typescript-eslint (pastikan modul ini sudah terinstal)
            parser: (await import('@typescript-eslint/parser')).default,
            parserOptions: {
                // Sesuaikan path project sesuai lokasi tsconfig.json Anda
                project: ['tsconfig.json']
            },
            // Definisikan global secara manual (menggantikan pengaturan dari "env")
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                node: 'readonly'
            }
        },
        // Masukkan plugin agar aturan "@typescript-eslint/..." dikenali
        plugins: {
            '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default
        },
        // Definisikan aturan linting
        rules: {
            // Aturan dasar ESLint
            'no-debugger': 'error',
            // Aturan dari @typescript-eslint
            // "@typescript-eslint/no-unused-vars": "warn",
            '@typescript-eslint/restrict-template-expressions': 'off',
            // Aturan gaya penulisan: misalnya, wajib menggunakan semicolon dan tanda kutip tunggal
            semi: 'off',
            quotes: ['error', 'single']
        }
    },
    // 3. Override untuk file JavaScript agar diperlakukan sebagai script (bukan module)
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'script'
        }
    }
]
