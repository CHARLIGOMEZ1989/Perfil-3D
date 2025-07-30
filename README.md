# 🌱 Soil Profile Pro

Un visualizador interactivo 3D de perfiles de suelo desarrollado con React y Three.js. Este proyecto permite la visualización detallada de diferentes capas de suelo con datos científicos precisos.

## 🚀 Características

- **Visualización 3D interactiva** de perfiles de suelo
- **Dashboard completo** con métricas y análisis
- **Panel de narración** para explicaciones detalladas
- **Interfaz responsive** con componentes UI modernos
- **Datos científicos reales** de muestras de suelo
- **Animaciones fluidas** con Framer Motion

## 🛠️ Tecnologías

- **React 19** - Framework de JavaScript
- **Three.js** - Gráficos 3D
- **@react-three/fiber** - React renderer para Three.js
- **@react-three/drei** - Utilidades para React Three Fiber
- **Tailwind CSS** - Framework de CSS
- **Vite** - Build tool y dev server
- **Framer Motion** - Animaciones
- **Radix UI** - Componentes de UI accesibles
- **Recharts** - Gráficos y visualizaciones

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- PNPM (recomendado) o npm

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/CHARLIGOMEZ1989/Perfil-3D.git
cd Perfil-3D
```

2. Instala las dependencias:
```bash
pnpm install
# o
npm install
```

3. Inicia el servidor de desarrollo:
```bash
pnpm dev
# o
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🏗️ Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm preview` - Previsualiza la build de producción
- `pnpm lint` - Ejecuta el linter ESLint

## 📁 Estructura del Proyecto

```
soil-profile-pro/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes de UI reutilizables
│   │   ├── SoilProfile3D.jsx    # Componente principal 3D
│   │   ├── SoilDashboard.jsx    # Dashboard de métricas
│   │   └── NarrationPanel.jsx   # Panel de información
│   ├── data/             # Datos de suelo
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Utilidades
│   └── assets/           # Recursos estáticos
├── package.json
└── README.md
```

## 🌟 Características Principales

### Visualización 3D
- Renderizado en tiempo real de capas de suelo
- Interacción con mouse/touch para rotación y zoom
- Diferentes modos de visualización

### Dashboard
- Métricas en tiempo real
- Gráficos interactivos
- Análisis de datos de suelo

### Panel de Narración
- Explicaciones científicas detalladas
- Información contextual de cada capa
- Datos técnicos precisos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Charlie Gómez** - [@CHARLIGOMEZ1989](https://github.com/CHARLIGOMEZ1989)

## 🙏 Agradecimientos

- Datos de suelo proporcionados por investigaciones científicas
- Comunidad de React Three Fiber
- Contribuidores de código abierto

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
