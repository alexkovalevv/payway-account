import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve, basename} from 'path';
import {copyFileSync, mkdirSync, existsSync, readdirSync, statSync, readFileSync, writeFileSync} from 'fs';

// Функция для копирования файлов из папки `assets` без вложенной структуры
function copyFilesFromFolder(src, dest) {
    if (!existsSync(dest)) {
        mkdirSync(dest, {recursive: true});
    }

    const entries = readdirSync(src);
    for (const entry of entries) {
        const srcPath = resolve(src, entry);
        const destPath = resolve(dest, entry);

        if (statSync(srcPath).isFile()) {
            // Если это CSS файл, заменяем содержимое перед копированием
            if (entry.endsWith('.css')) {
                let cssContent = readFileSync(srcPath, 'utf-8');
                // Заменяем пути `/assets/` на `./`
                cssContent = cssContent.replace(/\/assets\//g, './');
                writeFileSync(destPath, cssContent, 'utf-8');
                console.log(`✓ CSS файл ${srcPath} обработан и скопирован в ${destPath}`);
            } else {
                // Просто копируем файл без изменений
                copyFileSync(srcPath, destPath);
                console.log(`✓ Файл ${srcPath} скопирован в ${destPath}`);
            }
        }
    }
}

// Функция для замены путей к подключаемым файлам в `index.html`
function replacePathsInHtml(htmlContent, assetsDir) {
    // Получаем список файлов из директории assets
    const assetsFiles = existsSync(assetsDir) ? readdirSync(assetsDir) : [];

    // Поиск JavaScript и CSS файлов
    const jsFile = assetsFiles.find(file => file.endsWith('.js'));
    const cssFile = assetsFiles.find(file => file.endsWith('.css'));

    // Замена путей в содержимом HTML
    if (jsFile) {
        htmlContent = htmlContent.replace(
            /<script type="module".*?src=".*?"><\/script>/,
            `<script type="module" crossorigin src="<?php echo PAYWAY_PLUGIN_URL; ?>/assets/${jsFile}"></script>`
        );
    }

    if (cssFile) {
        htmlContent = htmlContent.replace(
            /<link rel="stylesheet".*?href=".*?">/,
            `<link rel="stylesheet" crossorigin href="<?php echo PAYWAY_PLUGIN_URL; ?>/assets/${cssFile}">`
        );
    }

    return htmlContent;
}

// Vite конфигурация
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'copy-resources-and-update-php-on-build',
            apply: 'build',
            writeBundle() {
                try {
                    // Директории ресурсов
                    const assetsDir = resolve(__dirname, 'dist', 'assets');
                    const distDir = resolve(__dirname, 'dist');
                    const destinationDir = resolve(__dirname, '../wp-content/plugins/payway-personal/assets');
                    const accountPhpPath = resolve(__dirname, '../wp-content/plugins/payway-personal/pages/account.php');

                    // Копируем файлы из `dist/assets` в папку назначения
                    if (existsSync(assetsDir)) {
                        copyFilesFromFolder(assetsDir, destinationDir);
                    } else {
                        console.warn(`⚠️ Каталог assets не найден: ${assetsDir}`);
                    }

                    // Также ищем остальные CSS-файлы в `dist` и копируем без папки `assets`
                    const distFiles = readdirSync(distDir);
                    for (const file of distFiles) {
                        const filePath = resolve(distDir, file);
                        if (statSync(filePath).isFile() && file.endsWith('.css')) {
                            let cssContent = readFileSync(filePath, 'utf-8');
                            // Заменяем пути `/assets/` на `./`
                            cssContent = cssContent.replace(/\/assets\//g, './');
                            const destPath = resolve(destinationDir, file);
                            writeFileSync(destPath, cssContent, 'utf-8');
                            console.log(`✓ Главный CSS файл ${filePath} обработан и скопирован в ${destPath}`);
                        }
                    }

                    // Читаем содержимое `index.html`
                    const indexHtmlPath = resolve(__dirname, 'dist', 'index.html');
                    if (existsSync(indexHtmlPath)) {
                        const indexHtmlContent = readFileSync(indexHtmlPath, 'utf-8');

                        // Изменяем пути подключения CSS и JS внутри HTML
                        const updatedHtmlContent = replacePathsInHtml(indexHtmlContent, destinationDir);

                        // Оборачиваем HTML в PHP шаблон и сохраняем в `account.php`
                        const phpTemplate = `<?php
/**
 * Шаблон страницы Личного кабинета
 
 * @author  Alex Kovalev <alex.kovalevv@gmail.com> <Telegram:@alex_kovalevv>
 * @copyright (c) 14.02.2025, CreativeMotion
 */
?>
${updatedHtmlContent}`;

                        writeFileSync(accountPhpPath, phpTemplate, 'utf-8');
                        console.log(`✓ обновлённый шаблон записан в ${accountPhpPath}`);
                    } else {
                        console.warn(`⚠️ Файл index.html не найден: ${indexHtmlPath}`);
                    }
                } catch (error) {
                    console.error('Ошибка при копировании файлов или обновлении шаблона PHP:', error);
                }
            }
        }
    ],
    server: {
        proxy: {
            '/wp-json': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/wp-json/, '/wp-json')
            }
        }
    }
});