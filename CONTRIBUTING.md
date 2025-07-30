# 🤝 Contribuir a Soil Profile Pro

¡Gracias por tu interés en contribuir a Soil Profile Pro! Este documento te guiará a través del proceso.

## 📋 Código de Conducta

Al participar en este proyecto, te comprometes a mantener un ambiente respetuoso y acogedor para todos.

## 🚀 Cómo Contribuir

### Reportar Bugs
1. Verifica que el bug no haya sido reportado antes
2. Abre un [nuevo issue](https://github.com/CHARLIGOMEZ1989/Perfil-3D/issues)
3. Incluye información detallada:
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si es necesario
   - Información del entorno (OS, navegador, versión)

### Sugerir Mejoras
1. Abre un [nuevo issue](https://github.com/CHARLIGOMEZ1989/Perfil-3D/issues)
2. Describe claramente la mejora propuesta
3. Explica por qué sería útil para el proyecto

### Contribuir Código

#### 1. Fork el Repositorio
```bash
# Clona tu fork
git clone https://github.com/TU-USUARIO/Perfil-3D.git
cd Perfil-3D

# Añade el repositorio original como upstream
git remote add upstream https://github.com/CHARLIGOMEZ1989/Perfil-3D.git
```

#### 2. Configura el Entorno de Desarrollo
```bash
# Instala dependencias
pnpm install

# Inicia el servidor de desarrollo
pnpm dev
```

#### 3. Crea una Rama
```bash
# Crea y cambia a una nueva rama
git checkout -b feature/mi-nueva-caracteristica
# o
git checkout -b fix/correccion-bug
```

#### 4. Realiza tus Cambios
- Sigue las convenciones de código existentes
- Añade comentarios cuando sea necesario
- Actualiza documentación si es relevante

#### 5. Ejecuta las Pruebas
```bash
# Ejecuta el linter
pnpm lint

# Verifica que la build funcione
pnpm build
```

#### 6. Commit tus Cambios
```bash
# Añade archivos
git add .

# Commit con mensaje descriptivo
git commit -m "feat: añadir nueva visualización de capas de suelo"
```

**Convención de Commits:**
- `feat:` nueva característica
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` cambios de formato/estilo
- `refactor:` refactorización de código
- `test:` añadir o modificar tests
- `chore:` tareas de mantenimiento

#### 7. Push y Pull Request
```bash
# Push a tu fork
git push origin feature/mi-nueva-caracteristica
```

Luego abre un Pull Request en GitHub con:
- Título descriptivo
- Descripción detallada de los cambios
- Referencias a issues relacionados
- Screenshots si aplica

## 🎨 Estándares de Código

### JavaScript/React
- Usa componentes funcionales con hooks
- Sigue las convenciones de ESLint configuradas
- Usa nombres descriptivos para variables y funciones
- Mantén componentes pequeños y enfocados

### CSS/Styling
- Usa Tailwind CSS para estilos
- Mantén consistencia con el diseño existente
- Usa variables CSS cuando sea apropiado

### Estructura de Archivos
```
src/
├── components/
│   ├── ui/           # Componentes reutilizables
│   └── ...           # Componentes específicos
├── data/             # Datos estáticos
├── hooks/            # Hooks personalizados
└── lib/              # Utilidades
```

## 🧪 Testing

Aunque actualmente no tenemos tests automatizados, al contribuir:
1. Prueba manualmente todas las funcionalidades afectadas
2. Verifica que la aplicación funcione en diferentes navegadores
3. Asegúrate que la build de producción funcione correctamente

## 📖 Documentación

Si tu contribución añade nuevas características:
- Actualiza el README.md si es necesario
- Documenta nuevas props o APIs
- Añade comentarios JSDoc cuando sea apropiado

## ❓ ¿Necesitas Ayuda?

- Abre un [issue](https://github.com/CHARLIGOMEZ1989/Perfil-3D/issues) con la etiqueta "question"
- Contacta al mantenedor: [@CHARLIGOMEZ1989](https://github.com/CHARLIGOMEZ1989)

## 🎉 Reconocimiento

Todos los contribuidores serán añadidos al README y reconocidos apropiadamente.

¡Gracias por contribuir a Soil Profile Pro! 🌱
